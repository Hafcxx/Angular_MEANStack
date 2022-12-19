'use strict'
const path = require('path');
const fs = require('fs');
const mongoosePaginate  = require('mongoose-pagination');

const Artist = require ('../models/artist');
const Album = require ('../models/album');
const Song = require ('../models/song');

function getArtists(req, res){
    let page = 1
    if(req.params.page){
        page = req.params.page;
    } 
    let itemsPerPage = 3; 

    Artist.find().sort('name').paginate(page, itemsPerPage, function (err, artists, total){
        if (err){
            res.status(500).send({message: 'Error en la petición.'});
        }else {
            if(!artists){
                res.status(404).send({message: 'No hay artistas.'});
            }else{
                return res.status(200).send({
                    total_items: total,
                    artist: artists
                });
            }
        }
    });
}

function getArtist(req, res){
    let artistId = req.params.id;
    
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

function updateArtist(req, res){
    let artistId  =req.params.id;
    let update = req.body; 

    Artist.findByIdAndUpdate(artistId, update, (err, artistUpdated)=>{
        if (err){
            res.status(500).send({message: 'Error al actualiuzar artista'});
        }else{
            if (!artistUpdated){
                res.status(404).send({message: 'El artista no ha acutalizado'});
            }else{
                res.status(200).send({artist: artistUpdated});
            }
        }
    });
}

module.exports = {
    getArtist,
    saveArtist,
    getArtists,
    updateArtist
}