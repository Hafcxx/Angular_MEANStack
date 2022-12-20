'use strict'

const express = require('express');
const albumController = require('../controller/album');
const api = express.Router();
const md_auth = require('../middlewares/authenticated');

const multipart = require ('connect-multiparty');
const md_upload = multipart ({ uploadDir: './uploads/album'})

api.get('/album',md_auth.ensureAuth, albumController.getAlbum);

api.post('/album',md_auth.ensureAuth, albumController.saveAlbum);

module.exports = api;