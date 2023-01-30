/* Imports */
const express = require('express');
const MoviesModel = require('../Schema/GetMovies');
const router = express.Router();

/* Get All Movies Details Route */
router.get('/all-movies', (req, res) => {
    MoviesModel.find({})
    .then((value) => {
        if(value.length > 0) {
            res.status(200).json({message: 'Success', data: value})
        }
        else {
            res.status(200).json({message: 'No Movie Found.'})
        }
    })
    .catch((err) => {
        res.status(503).json({message: 'Something went wrong...', err: err})
    })
});


/* Get Single Movie Detail Route */
router.get('/movie/:id', (req, res) => {
    MoviesModel.findOne({_id: req.params.id})
    .then((value) => {
        if(value) {
            res.status(200).json({message: 'Success', data: value})
        }
        else {
            res.status(200).json({message: 'No Movie Found.'})
        }
    })
    .catch((err) => {
        res.status(503).json({message: 'Something went wrong...', err: err})
    })
});



/* Exports Router */
module.exports = router;