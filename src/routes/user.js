const User = require('../models/user');
const { verifyToken, isAdmin } = require('../middleware/authentication');

const express = require('express');
const app = express();
const bcrypt = require('bcrypt');


app.get('/', (req, res) => {
    res.send('HOME');
});

// [[GET ONE]]


// [[GET A RANGE OF USERS]]
app.get('/users', (req, res) => {

    // return res.json({
    //     user: req.user,
    //     name: req.user.name,
    //     email: req.user.email,
    //     role: req.user.role
    // });

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    User.find({state: true})
        .skip(desde)
        .limit(limite)
        .exec((err, users) => {
            if(err){
                console.log('Error finding users');
                return res.status(400).json({
                    ok: false,
                    err: err
                });
            }

            User.count({/*WHERE*/state: true}, (err, total) => {
                res.json({
                    ok: true,
                    users,
                    quantity: total
                });
            });
        });
});


// [[ CREATE ]]
app.post('/user', (req, res) => {
    let body = req.body;

    let user = new User({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
        //img: body.img
    });

    user.save((err, userDB) => {
        if(err){
            console.log('error posting')
            return res.status(400).json({
                ok: false,
                err: err
            });
        }

        // no nos interesa mostrar la encriptación al usuario, por eso:
        //userDB.password = null; //con esto no puede saber cual es

        //pero para quitar todo el atributo y que no vea el nombre del campo se usa toJSON en el modelo
        
        res.json({
            ok: true,
            user: userDB
        })
    });
});


// [[ UPDATE ]]
app.put('/user/:id', verifyToken, (req, res) => {

    let id = req.params.id;
    let body = req.body;

    //esta es una forma de evitar que los campos se modifiquen pero si son muchos puede ser no práctica
    //delete body.password;
    //delete body.google;
    //pero se puede usar el package "underscore" para hacer la lista de los capmos que no deben cambiar en el put

    User.findByIdAndUpdate(id, body, { new: true }, (err, userDB) => {
        if(err){
            console.log('ERROR UPDATING')
            return res.status(400).json({
                ok: false,
                err: err
            });
        }

        res.json({
            ok: true,
            user: userDB
        });
    });
});

// [[ DELETE ]]
app.delete('/user/:id', verifyToken, (req, res)=>{
    let id = req.params.id;
    
    //esta linea elmina el registro (lo que no debería pasar)
    //User.findByIdAndRemove(id, (err, userRemoved) => {

    //en cambio cambiaremos el "estado" de true a false
    let stateChange = {
        state: false
    }

    User.findByIdAndUpdate(id, stateChange, {new: true}, (err, userRemoved)=> {
        if(err){
            console.log('ERROR UPDATING');
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if(!userRemoved){
            return res.status(400).json({
                ok: false,
                error: {
                    message: 'User not found.'
                }
            });
        }

        res.json({
            ok: true,
            user: userRemoved
        });
    });
});



module.exports = app;

