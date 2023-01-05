'use strict'

const express = require('express');
const artistController = require('../controller/artist');
const api = express.Router();
const md_auth = require('../middlewares/authenticated');

const multipart = require ('connect-multiparty');
const md_upload = multipart ({ uploadDir: './uploads/artists'})

api.get('/artist/:id',md_auth.ensureAuth, artistController.getArtist);
api.get('/artists/:page?',md_auth.ensureAuth, artistController.getArtists);
api.get('/get-image-artist/:imageFile', artistController.getImageFile);

api.put('/artist/:id',md_auth.ensureAuth, artistController.updateArtist);

api.post('/artist',md_auth.ensureAuth, artistController.saveArtist);
api.post('/upload-image-artist/:id', [md_auth.ensureAuth, md_upload], artistController.uploadImage);

api.delete('/artists/:id',md_auth.ensureAuth, artistController.deleteArtist);



module.exports = api;