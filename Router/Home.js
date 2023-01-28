const express = require('express');
const verify = require('../Middleware/AuthJWT');
const RegisterModel = require('../Schema/Register');
const router = express.Router();
const bcrypt = require('bcryptjs')

router.get('/login', (req, res) => {
    RegisterModel.findOne({email: req.body.email})
    .then((value) => {
        if(value) {
            res.status(200).json({message: 'User Already Registered'});
        }
        else {
            const newRegister = new RegisterModel({
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 2)
            })
            newRegister.save()
            .then(() => {
                res.status(404).json({message: 'Not registered, now registered'})
            })
            .catch(() => {
                res.status(503).send({message: 'Something went wrong...'})
            })
            
        }
    })
    .catch(() => {
        res.status().json({message: 'Something went wrong...'})
    })
})

module.exports = router;