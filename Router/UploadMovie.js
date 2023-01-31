/* Imports */
const express = require('express');
const MoviesModel = require('../Schema/GetMovies');
const router = express.Router();
const verify = require('../Middleware/AuthJWT')


/* Upload new movie Route */
router.post('/upload', verify, (req, res) => {
    const {cover, title, year, desc, rating} = req.body;
    const newMovie = new MoviesModel({cover, title, year, desc, rating});
    newMovie.save()
        .then(() => {
            /* Send response with jwt. */
            res.status(200).json({ message: 'Successfully Added...'});
        })
        /* Some error */
        .catch(() => {
            res.status(503).send({ message: 'Something went wrong...' })
        })
})

/* Export router */
module.exports = router;