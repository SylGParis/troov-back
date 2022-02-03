const mongoose = require('mongoose')

const objectSchema = mongoose.Schema({
    name: String,
    type: String,
    color: String,
    found_location: String,
    desc: String,
    date: String,
    place: String,
})

module.exports = mongoose.model('objects', objectSchema)