const mongoose = require('mongoose');

const shareSchema = new mongoose.Schema({
    id: String,
    email: String
});

module.exports = mongoose.model('Shared', shareSchema, 'Shared');
