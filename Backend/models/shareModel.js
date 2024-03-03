const mongoose = require('mongoose');

const shareSchema = new mongoose.Schema({
    id: String,
    sharedTo: String,
    sharedBy: String
});

module.exports = mongoose.model('Shared', shareSchema, 'Shared');
