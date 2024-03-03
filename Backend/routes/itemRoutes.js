// routes/itemRoutes.js
const express = require('express');
const router = express.Router();
const Notes = require('../models/itemModel');
const Shared = require('../models/shareModel');

// Create
router.post('/', async (req, res) => {
  try {
    const newItem = await Notes.create(req.body);
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Read all
router.get('/getAll/:email', async (req, res) => {
  try {
    const items = await Notes.find({email:req.params.email});
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Read one
router.get('/:id', async (req, res) => {
  try {
    const item = await Notes.findById(req.params.id);
    if (!item) throw new Error('Notes not found');
    res.json(item);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});
router.put('/:id', async (req, res) => {
  try {
    const updatedItem = await Notes.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete
router.delete('/:id', async (req, res) => {
  try {
    const deletedItem = await Notes.findByIdAndDelete(req.params.id);
    if(deletedItem){
      await Shared.deleteMany({sharedBy:deletedItem.email});
    }
    res.json(deletedItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;