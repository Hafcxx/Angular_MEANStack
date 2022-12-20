'use strict'

const express = require('express');
const albumController = require('../controller/album');
const api = express.Router();
const md_auth = require('../middlewares/authenticated');

const multipart = require ('connect-multiparty');
const md_upload = multipart ({ uploadDir: './uploads/album'})

api.get('/album/:id',md_auth.ensureAuth, albumController.getAlbum);
api.get('/albums/:artist?',md_auth.ensureAuth, albumController.getAlbums);

api.post('/album',md_auth.ensureAuth, albumController.saveAlbum);

module.exports = api;