const mongoose = require('mongoose');

/* Schema for Movies Data */
const MovieSchema = new mongoose.Schema({
    cover: String,
    title: String,
    year: String,
    desc: String,
})
const MoviesModel = mongoose.model('Movie', MovieSchema)

module.exports = MoviesModel;