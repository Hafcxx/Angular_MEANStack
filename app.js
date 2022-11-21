'use strict'

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

//cargar rutas(routes)
const user_routes = require('./routes/user')
const artist_routes = require ('./routes/artist');
//const api = require('./routes/artist');
//const artist = require('./models/artist');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//configurar las cabecceras http


//carga de rutas base 
app.use('/api', user_routes);
app.use ('/api', artist_routes);

module.exports = app;