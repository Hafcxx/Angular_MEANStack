'use strict'

const express = require('express');
const userController = require('../controller/user');

const api = express.Router();
const md_auth = require ('../middlewares/authenticated');

/*Enviando peticion al controlador con un req (ej: req.method (get) .url/probando-controlador) 
y un res declarado en el contraldor con un mensaje y un status*/
api.get('/probando-controlador', md_auth.ensureAuth ,userController.pruebas);
api.post('/register', userController.saveUser);
api.post('/login', userController.loginUser);
api.put('/update-user/:id', md_auth.ensureAuth, userController.updateUser);

module.exports = api;