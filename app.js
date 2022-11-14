'use strict'

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

//cargar rutas(routes)

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//configurar las cabecceras http

//carga de rutas base 
app.get('/pruebas', function (req, res){
    res.status(200).send({message: 'Bienvenido al curso jajaj'})
})

module.exports = app;