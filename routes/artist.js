'use strict'

const express = require('express');
const artistController = require('../controller/artist');
const api = express.Router();
const md_auth = require('../middlewares/authenticated');

api.get('/artist/:id',md_auth.ensureAuth, artistController.getArtist);
api.post('/artist',md_auth.ensureAuth, artistController.saveArtist);

module.exports = api;