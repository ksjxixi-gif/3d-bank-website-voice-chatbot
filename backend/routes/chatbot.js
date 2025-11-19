const express = require('express');
const router = express.Router();
const faqData = require('../data/faq-dataset.json');
const { findBestMatch, extractIntent } = require('../utils/nlp');

// POST /api/chatbot/message
router.post('/message', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Invalid message' });
    }

    const userMessage = message.toLowerCase().trim();

    // Extract intent and find best matching answer
    const intent = extractIntent(userMessage);
    const response = findBestMatch(userMessage, faqData, intent);

    res.json({
      response: response,
      intent: intent,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Chatbot error:', error);
    res.status(500).json({
      error: 'Failed to process message',
      response: "I'm having trouble understanding. Could you rephrase that?",
    });
  }
});

// GET /api/chatbot/faqs
router.get('/faqs', (req, res) => {
  try {
    res.json(faqData);
  } catch (error) {
    console.error('FAQ fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch FAQs' });
  }
});

module.exports = router;
