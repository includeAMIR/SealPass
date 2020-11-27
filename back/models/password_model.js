const mongoose = require('mongoose');

const passwordSchema = mongoose.Schema({
    site: String,
    email: String,
    password: String,
    userId: String
});

module.exports = mongoose.model('password_model', passwordSchema);