const mongoose = require('mongoose');

const userSignupSchema = mongoose.Schema({
    fullName: String,
    email: String,
    password: String
});

module.exports = mongoose.model('user_model', userSignupSchema);