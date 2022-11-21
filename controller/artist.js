'use strict'
const path = require('path');
const fs = require('fs');

const Artist = require ('../models/artist');
const Album = require ('../models/album');
const Song = require ('../models/song');

function getArtist(req, res){
    let artistId = req.params.artistId

    Artist.findById(artistId, (err, artist) => {
        if(err){
            res.status(500).send({message : "Error al buscar artista"});
        }else{
            if(!artist){
                res.status(404).send({message : "Artista no encontrado"});
            }else{
                res.status(200).send({artist});
            }
        }
    })    
}

function saveArtist(req, res){
    let artist = new Artist();
    let params = req.body;
    artist.name = params.name; 
    artist.description = params.description;
    artist.image = 'null';

    artist.save((err, artistStored) => {
        if(err){
            res.status(500).send({message: 'Error al guardar artista'});
        }else{
            if(!artistStored){
                res.status(404).send({message: 'El artista no ha sido guardado'});
            }else{
                res.status(200).send({artist: artistStored});
            }
        }
    });
}

module.exports = {
    getArtist,
    saveArtist
}