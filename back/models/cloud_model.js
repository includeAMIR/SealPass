const mongoose = require('mongoose');

const cloudFileSchema = mongoose.Schema({
    fileName: String,
    fileType: String,
    filePath: String,
    date: String,
    userId: String
});

module.exports = mongoose.model('cloud_model', cloudFileSchema);