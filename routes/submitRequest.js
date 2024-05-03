const express = require('express');
const router = express.Router();
const makeRequestWithProxy = require('../helpers/gptRequest');

router.post('/form', async (req, res) => {
  try {
    console.log('*****submit request')
    const { type, adj, prompt } = req.body;
    const result = await makeRequestWithProxy(type, adj, prompt);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;