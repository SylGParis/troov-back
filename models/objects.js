const mongoose = require('mongoose')

const objectSchema = mongoose.Schema({
    name: String,
    type: String,
    found_location: String,
    desc: String,
    date: String,
    contact: String,
})

module.exports = mongoose.model('objects', objectSchema)