'use strict'

const mongoose = require ('mongoose');
const schema = mongoose.Schema; 

const userSchema = schema({
    name: String, 
    surname: String,
    email: String,
    password: String,
    rol: String,
    image: String
})

module.exports = mongoose.model('User', userSchema);