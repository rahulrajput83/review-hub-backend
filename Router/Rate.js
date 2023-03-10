const express = require('express');
const router = express.Router();
const MoviesModel = require('../Schema/GetMovies');
const verify = require('../Middleware/AuthJWT');

/* Rate Movie Route */
router.put('/rate', verify, (req, res) => {
    MoviesModel.updateOne({_id: req.body.movieId}, {$set: {"rating": req.body.rating}, $push: {"rated": {user: {_id: req.user._id, userName: req.user.userName}, rating: req.body.rated}}})
    .then(() => {
        res.status(200).json({message: 'Success'})
    })
    .catch(() => {
        res.status(503).json({message: 'Something went wrong...'})
    })
})

module.exports = router;