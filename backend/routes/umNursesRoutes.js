const express = require('express');
const umNursesController = require('../controllers/umNursesController');
const app=express();
const { fetchDataAndPopulate } = require('../utils/dataPopulator');


app.get('/um-nurses', async (req, res) => {
  try {

    await fetchDataAndPopulate('um');

    const umNurses = await umNursesController.getUmNurses();
    res.json(umNurses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/um-nurses', async (req, res) => {
  try {
    const newUmNurse = await umNursesController.createUmNurse(req.body);
    res.status(201).json(newUmNurse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = app;
