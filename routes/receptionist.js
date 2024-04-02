const express = require('express');
const router = express.Router();
const Visitors = require('../models/Visitors');
const io = require('socket.io')();

router.post('/login', passport.authenticate('local'), (req, res) => {
  res.status(200).json({ message: 'Login successful' });
});

router.post('/upload-visitor', (req, res) => {
  const visitorData = req.body;

  Visitors.create(visitorData)
    .then((visitor) => {
      io.emit('newVisitor', visitor);

      res.status(200).json({ message: 'Visitor uploaded successfully' });
    })
    .catch((error) => {
      res.status(500).json({ error: 'An error occurred while uploading the visitor' });
    });
});

module.exports = router;
