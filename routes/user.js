'use strict'

const express = require('express');
const userController = require('../controller/user');

const api = express.Router();

/*Enviando peticion al controlador con un req (ej: req.method (get) .url/probando-controlador) 
y un res declarado en el contraldor con un mensaje y un status*/
api.get('/probando-controlador', userController.pruebas);
api.post('/register', userController.saveUser);
api.post('/login', userController.loginUser);

module.exports = api;