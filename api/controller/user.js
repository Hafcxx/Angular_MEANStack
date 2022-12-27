'use strict'

const bcrypt = require('bcrypt-nodejs');
const { restart } = require('nodemon');
const User = require('../models/user');
const jwt = require ('../services/jwt');
const fs = require ('fs');
const path = require ('path');

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

function updateUser (req, res){
    let userId  = req.params.id;
    let update  =req.body;

    //Capturamos la información con los metodos de User
    User.findByIdAndUpdate(userId, update, (err, userUpdate) => {
        if(err){
            res.status(500).send({message: 'Error al actualizar datos de user'})
        }else{
            if (!userUpdate ){
                res.status(404).send ({message: 'No se ha podido acutalizar el usuario'});
            }else{
                res.status(200).send({user: userUpdate})
            }
        }
    });
}

function uploadImage (req, res){
    let userId = req.params.id;
    let file_name = 'No subido...';

    if(req.files){
        let file_path = req.files.image.path; 
        let file_split = file_path.split('\\')
        let file_name = file_split[2];
        let ext_split = file_name.split('\.')
        let file_ext = ext_split[1]

        if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif' ){

            User.findByIdAndUpdate(userId, {image: file_name}, (err, userUpdate) =>{
                if (!userUpdate ){
                    res.status(404).send ({message: 'No se ha podido acutalizar el usuario'});
                }else{
                    res.status(200).send({image: file_name, user: userUpdate})}
            });

        }else {
            res.status(200).send({message: 'Extensión del archivo no valida'})
        }
        console.log(file_path);
    }else{
        req.status(200).send({message: 'No has subido ninguna imagen...'})
    }
}

function getImageFile(req, res){
    let imageFile = req.params.imageFile;
    let path_file = './uploads/users/'+imageFile
    fs.exists(path_file, function(exists){
        if(exists){
            res.sendFile(path.resolve(path_file));
        }else{
            res.status(200).send({message: 'No existe la imagen'});
        }
    });
}

module.exports = {
    pruebas,
    saveUser,
    loginUser,
    updateUser,
    uploadImage,
    getImageFile
};