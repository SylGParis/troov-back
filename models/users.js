const mongoose = require('mongoose')


const userSchema = mongoose.Schema({
    userName: String,
    userEmail: String,
    userPassword: String,
})

const userModel = mongoose.model('users', userSchema)

module.exports = userModel