// routes/transcribe.js
// Handles audio transcription via OpenAI Whisper API
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const router = express.Router();

// Configure multer for audio uploads
const audioUpload = multer({
  dest: path.join(__dirname, '../tmp/audio'),
  limits: { fileSize: 25 * 1024 * 1024 }, // 25MB max
  fileFilter: (req, file, cb) => {
    // Accept audio formats
    const allowed = ['audio/wav', 'audio/webm', 'audio/mpeg', 'audio/mp4'];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid audio format'));
    }
  }
});

// POST /api/transcribe
// Transcribe audio chunk to text and detect if it's a question
router.post('/transcribe', audioUpload.single('audio'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No audio file provided' });
    }

    const audioPath = req.file.path;
    const audioStream = fs.createReadStream(audioPath);

    // Transcribe using Whisper
    const transcript = await openai.createTranscription(audioStream, 'whisper-1', undefined, 'json', undefined, 'en');

    // Clean up uploaded file
    fs.unlinkSync(audioPath);

    // Simple heuristic: detect if it's likely a question
    const text = transcript.text;
    const isQuestion = /\?$/.test(text.trim()) || 
                       /^(what|why|how|who|when|where|can you|could you|would you|do you|does|did|is|are|have you)\s/i.test(text);

    res.json({
      transcript: text,
      isQuestion: isQuestion,
      confidence: 0.95
    });

  } catch (err) {
    console.error('[Transcribe] Error:', err.message);
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ error: 'Transcription failed', details: err.message });
  }
});

module.exports = router;
