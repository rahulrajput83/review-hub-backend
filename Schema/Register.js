const mongoose = require('mongoose');

/* Schema for User Data */
const RegisterSchema = new mongoose.Schema({
    email: String,
    password: String,
})
const RegisterModel = mongoose.model('User', RegisterSchema)

module.exports = RegisterModel;