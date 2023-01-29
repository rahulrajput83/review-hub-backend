/* Imports */
const express = require('express');
const RegisterModel = require('../Schema/Register');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')



/* Login/Register Route */
router.post('/login', (req, res) => {
    /* Finds one document from MongoDB with user email address. */
    RegisterModel.findOne({email: req.body.email})
    .then((value) => {
        /* If find data in mongoDB */
        if(value) {
            /* Verify Password with store password and user provided password. */
            const verifyPassword = bcrypt.compareSync(req.body.password, value.password);
            
            if(!verifyPassword) {
                /* If not match, send response. */
                res.status(404).json({message: 'Wrong Password'})
            }
            else{
                /* If matched, encode user data with jwt. */
                const token = jwt.sign({user: value}, process.env.key);
                /* Send response with jwt token. */
                res.status(200).json({message: 'success', accessToken: token});
            }
        }
        /* If not find data in mongoDB, create new in mongoDB. */
        else {
            
            const split = req.body.email.split("@")[0];
            const newRegister = new RegisterModel({
                userName: split,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 2)
            })
            newRegister.save()
            .then((value) => {
                /* on new data created, encode with jwt. */
                const token = jwt.sign({user: value}, process.env.key);
                /* Send response with jwt. */
                res.status(404).json({message: 'success', accessToken: token});
            })
            /* Some error */
            .catch(() => {
                res.status(503).send({message: 'Something went wrong...'})
            })
            
        }
    })
    /* Some error */
    .catch(() => {
        res.status().json({message: 'Something went wrong...'})
    })
})

/* Export router */
module.exports = router;