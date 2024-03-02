const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  email:String,
  description: String,
});

module.exports = mongoose.model('Notes', itemSchema,'NotesApp');
