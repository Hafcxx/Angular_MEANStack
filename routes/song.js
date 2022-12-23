'use strict'

const express = require('express');
const songController = require('../controller/song');

const api = express.Router();
const md_auth = require ('../middlewares/authenticated');

const multipart = require ('connect-multiparty');
const md_upload = multipart({ uploadDir: './uploads/songs'}); 

/*Enviando peticion al controlador con un req (ej: req.method (get) .url/probando-controlador) 
y un res declarado en el contraldor con un mensaje y un status*/
api.get('/song/:id', md_auth.ensureAuth ,songController.getSong);
api.get('/songs/:album?', md_auth.ensureAuth ,songController.getSongs);
api.get('/get-song-file/:songFile', songController.getSongFile);

api.post('/upload-file-song/:id', [md_auth.ensureAuth, md_upload], songController.uploadFile);
api.post('/song', md_auth.ensureAuth ,songController.saveSong);

api.put('/song/:id', md_auth.ensureAuth ,songController.updateSong);

api.delete('/song/:id', md_auth.ensureAuth ,songController.deleteSong);

module.exports = api;