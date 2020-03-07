const User = require('../models/user');

const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

app.post('/login', (req, res) => {

    let body = req.body;

    User.findOne({email: body.email}, (err, userDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if(!userDB){
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Username or password are incorrect.'
                }
            })
        }

        if(!bcrypt.compareSync(body.password, userDB.password)){
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Username or password are incorrect.'
                }
            });
        }

        let token = jwt.sign({
            user: userDB, 
        }, process.env.SEED, { expiresIn: process.env.TOKEN_EXPIRE});    // 3 minutos

        res.json({
            ok: true,
            user: userDB,
            token
        });
    });
});


module.exports = app;