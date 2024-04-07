const express = require('express');
const app = express();
const paCasesController = require('../controllers/paCasesController');
const { fetchDataAndPopulate } = require('../utils/dataPopulator');

app.get('/pa-cases', async (req, res) => {
  try {
    await fetchDataAndPopulate('pa'); 
    
    const paCases = await paCasesController.getPaCases();
    res.json(paCases);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/pa-cases', async (req, res) => {
  try {

    
    const newPaCase = await paCasesController.createPaCase(req.body);
    res.status(201).json(newPaCase);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = app;
