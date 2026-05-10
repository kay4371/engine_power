// routes/coach.js
// Handles interview coaching via Claude API with SSE streaming
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { Readable } = require('stream');
const { MongoClient } = require('mongodb');
const Anthropic = require('@anthropic-ai/sdk');

const router = express.Router();

const uri = process.env.MONGO_URI ||
  `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}/${process.env.MONGO_DB}${process.env.MONGO_OPTIONS}`;

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

// Configure multer for CV uploads
const cvUpload = multer({
  dest: path.join(__dirname, '../tmp/cv'),
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB max
});

// Helper: Get CV for user from MongoDB
async function getCvForUser(userId) {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db  = client.db('olukayode_sage');
    const doc = await db.collection('interview_cv_store').findOne({ userId });
    return doc ? doc.text : null;
  } finally {
    await client.close();
  }
}

// Helper: Save CV for user to MongoDB
async function saveCvForUser(userId, cvData) {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db('olukayode_sage');
    await db.collection('interview_cv_store').updateOne(
      { userId },
      { 
        $set: { 
          userId, 
          text: cvData.text,
          filename: cvData.filename,
          uploadedAt: new Date() 
        } 
      },
      { upsert: true }
    );
  } finally {
    await client.close();
  }
}

// Helper: Delete CV for user
async function deleteCvForUser(userId) {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    await client.db('olukayode_sage').collection('interview_cv_store').deleteOne({ userId });
  } finally {
    await client.close();
  }
}

// POST /api/coach
// Stream real-time coaching response via SSE
router.post('/coach', express.json(), async (req, res) => {
  try {
    const userId = req.session?.userId || req.interviewHelperUser?.userId;
    const { question, jobRole, jobCompany, context } = req.body;

    if (!question) {
      return res.status(400).json({ error: 'Question required' });
    }

    // Get user's CV if available
    const cvText = userId ? await getCvForUser(userId) : null;

    // Build system prompt
    let systemPrompt = `You are an expert interview coach helping a candidate prepare for a job interview.
Your role is to:
1. Acknowledge the question
2. Provide a structured, concise answer (30-60 seconds of speaking)
3. Include specific examples from experience if applicable
4. End with a brief tip or confidence boost

Keep responses conversational and encouraging. Format as clear, spoken advice.`;

    if (cvText) {
      systemPrompt += `\n\nCandidate's CV:\n${cvText}`;
    }

    if (jobRole || jobCompany) {
      systemPrompt += `\n\nJob Context: ${jobRole || 'Unknown Role'} at ${jobCompany || 'Unknown Company'}`;
    }

    if (context) {
      systemPrompt += `\n\nAdditional Context: ${context}`;
    }

    // Set SSE headers
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // Stream response from Claude
    const stream = anthropic.messages.stream({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 500,
      system: systemPrompt,
      messages: [
        {
          role: 'user',
          content: `Interview Question: ${question}`
        }
      ]
    });

    const readable = stream.toReadableStream();
    const reader = readable.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value, { stream: true });
      if (chunk) {
        res.write(`data: ${JSON.stringify({ type: 'text', content: chunk })}\n\n`);
      }
    }

    res.write(`data: ${JSON.stringify({ type: 'complete' })}\n\n`);
    res.end();

  } catch (err) {
    console.error('[Coach] Error:', err.message);
    res.status(500).json({ error: 'Coaching failed', details: err.message });
  }
});

// POST /cv
// Upload CV for personalized coaching context
router.post('/cv', cvUpload.single('cv'), express.json(), async (req, res) => {
  try {
    const userId = req.session?.userId || req.interviewHelperUser?.userId;
    
    if (!userId) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No CV file provided' });
    }

    // Read file content
    const cvPath = req.file.path;
    const cvContent = fs.readFileSync(cvPath, 'utf-8');

    // Save to MongoDB
    await saveCvForUser(userId, {
      text: cvContent,
      filename: req.file.originalname
    });

    // Clean up temporary file
    fs.unlinkSync(cvPath);

    res.json({ 
      success: true, 
      message: 'CV uploaded and stored',
      filename: req.file.originalname 
    });

  } catch (err) {
    console.error('[CV Upload] Error:', err.message);
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ error: 'CV upload failed', details: err.message });
  }
});

// DELETE /cv
// Delete user's stored CV
router.delete('/cv', async (req, res) => {
  try {
    const userId = req.session?.userId || req.interviewHelperUser?.userId;
    
    if (!userId) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    await deleteCvForUser(userId);

    res.json({ success: true, message: 'CV deleted' });

  } catch (err) {
    console.error('[CV Delete] Error:', err.message);
    res.status(500).json({ error: 'CV deletion failed' });
  }
});

// GET /cv/status
// Check if user has a stored CV
router.get('/cv/status', async (req, res) => {
  try {
    const userId = req.session?.userId || req.interviewHelperUser?.userId;
    
    if (!userId) {
      return res.json({ hasCv: false });
    }

    const cvData = await getCvForUser(userId);

    res.json({
      hasCv: !!cvData,
      filename: cvData ? 'CV on file' : null
    });

  } catch (err) {
    console.error('[CV Status] Error:', err.message);
    res.status(500).json({ error: 'Status check failed' });
  }
});

// POST /context
// Store additional context for coaching (e.g., company research notes)
router.post('/context', express.json(), async (req, res) => {
  try {
    const userId = req.session?.userId || req.interviewHelperUser?.userId;
    const { context } = req.body;

    if (!userId) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const client = new MongoClient(uri);
    try {
      await client.connect();
      const db = client.db('olukayode_sage');
      
      await db.collection('interview_context').updateOne(
        { userId },
        { $set: { userId, context, updatedAt: new Date() } },
        { upsert: true }
      );

      res.json({ success: true, message: 'Context saved' });
    } finally {
      await client.close();
    }

  } catch (err) {
    console.error('[Context] Error:', err.message);
    res.status(500).json({ error: 'Context save failed' });
  }
});

module.exports = router;
