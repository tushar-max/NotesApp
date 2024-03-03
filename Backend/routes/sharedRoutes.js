// routes/itemRoutes.js
const express = require('express');
const router = express.Router();
const Shared = require('../models/shareModel');

// Create
router.post('/', async (req, res) => {
  try {
    const newItem = await Shared.create(req.body);
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Read all
router.get('/getAll/:email', async (req, res) => {
  try {
    const items = await Shared.find({sharedTo:req.params.email});
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const deletedItem = await Shared.findByIdAndDelete(req.params.id);
    res.json(deletedItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;