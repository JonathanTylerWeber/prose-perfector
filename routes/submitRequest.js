const express = require('express');
const router = express.Router();
const { getRating, rewritePrompt } = require('../helpers/gptRequest');

router.post('/rating', async (req, res) => {
  try {
    console.log('*****submit request rating')
    const { type, adj, prompt } = req.body;
    const result = await getRating(type, adj, prompt);
    console.log(`rating result: ${result}`);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/rewrite', async (req, res) => {
  try {
    console.log('*****submit request rewrite')
    const { type, adj, prompt } = req.body;
    const result = await rewritePrompt(type, adj, prompt);
    console.log(`rewrite result: ${result}`);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;