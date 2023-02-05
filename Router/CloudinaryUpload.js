const express = require('express');
const verify = require('../Middleware/AuthJWT');
const router = express.Router();
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret
})

router.post('/image', verify, (req, res) => {
    if(req.body.image) {
        cloudinary.uploader.upload(req.body.image, {folder: 'ReviewHub'})
        .then(result => {
            res.status(200).json({message: 'Success', url: result.secure_url})
        })
        .catch(() => {
            res.status(501).json({message: 'Something went wrong...'})
        })
    }
})

module.exports = router;