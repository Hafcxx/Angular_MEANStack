'use strict'

const express = require('express');
const artistController = require('../controller/artist');
const api = express.Router();
const md_auth = require('../middlewares/authenticated');

api.get('/artist',md_auth.ensureAuth, artistController.getArtist);

module.exports = api;