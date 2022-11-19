'use strict'

const bcrypt = require('bcrypt-nodejs');
const { restart } = require('nodemon');
const User = require('../models/user');
const jwt = require ('../services/jwt')

function pruebas (req, res){
    res.status(200).send({
        message: 'Probando una acción del controlador de usuarios del api rest '
    });
}

function saveUser (req, res){
    let user = new User();

    let params = req.body; 
    console.log(params);

    user.name = params.name;
    user.surname = params.surname;
    user.email = params.email;
    user.role = 'ROLE_ADMIN';
    user.image = 'null';
    
    if (params.password){
        //Encriptar conrtraseña y guardar datos
        bcrypt.hash(params.password, null, null, function(err, hash) {
            user.password = hash; 
            if(user.name != null && user.surname != null && user.email !=null) {
                //guadar usuario
                user.save((err, userStored) => {
                    if (err){
                        restart.status(500).send({message: 'Error al guardar usuario'})
                    }else {
                        if(!userStored){
                            res.status(404).send({message: 'No se registró el usuario'})
                        }else {
                            res.status(200).send({user: userStored});
                        }
                    }
                });

            }else {
                res.status(200).send ({message: 'Introduce correctamente todos los datos'})
            }
        });
    }else {
        res.status(200).send({message: 'Introduzca contraseña'});
    }
}

function loginUser(req, res){
    let params = req.body; 
    let email  = params.email;
    let password = params.password;
    
    User.findOne({email: email.toLowerCase()}, (err, user) => {
        if (err){
            res.status(500).send({message: "Error en la petición"});
        }else {
            if (!user) {
                res.status(404).send({message: 'El usuario no existe'});
            }else {
                //Comprobar la contraseña
                bcrypt.compare(password, user.password, function (err, check){
                    if(check){
                        //devolver los datos del usuario
                        if (params.gethash){
                            //devolver un token de jwt
                            res.status(200).send({
                                token: jwt.createToken(user)
                            });
                        }else {
                            res.status (200).send({user});
                        }
                    }else {
                        res.status(404).send({message: 'El usuario no ha podido loguear'})
                    }
                });
            }
        }
    })
}

module.exports = {
    pruebas,
    saveUser,
    loginUser
};