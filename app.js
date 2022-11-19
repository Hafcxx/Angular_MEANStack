'use strict'

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

//cargar rutas(routes)
const user_routes = require('./routes/user')


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//configurar las cabecceras http


//carga de rutas base 
app.use('/api', user_routes);

module.exports = app;