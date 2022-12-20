'use strict'
const path = require('path');
const fs = require('fs');
const mongoosePaginate  = require('mongoose-pagination');

const Artist = require ('../models/artist');
const Album = require ('../models/album');
const Song = require ('../models/song');
const { restart } = require('nodemon');

function updateAlbum (req, res){
    let albumId = req.params.id;
    let update = req.body; 

    Album.findByIdAndUpdate(albumId, update, (err, albumUpdated) => {
        if (err){
            res.status(500).send({message: 'Error en el servidor '});
        }else {
            if(!albumUpdated){
                res.status(404).send({message: 'No existe el album'});
            }else{
                res.status(200).send({album: albumUpdated})
            }
        }
    });
}

function getAlbums (req, res){
    let artistsId = req.params.artist;

    if(!artistsId){
        //sacar todos los albums de db
        var find = Album.find({}).sort('title');
    }else{
        //sacar todos los albums del artista
        var find = Album.find({artist: artistsId}).sort('year');
    }

    find.populate({path: 'artist'}).exec((err, albums) =>{
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }else{
            if(!albums){
                res.status(404).send({message: 'No hay albums'});
            }else{
                res.status(200).send({albums});
            }
        }
    });
}

function getAlbum(req, res){
    let albumId = req.params.id;

    Album.findById(albumId).populate({path: 'artist'}).exec((err, album)=>{
        if (err){
            res.status(500).send({message: 'Error en la id'});
        }else {
            if(!album){
                res.status(404).send({message: 'No existe el album'});
            }else{
                res.status(200).send({album})
            }
        }
    })
}

function saveAlbum (req, res){
    let album = new Album();
    let params = req.body; 

    album.title = params.title; 
    album.description = params.description; 
    album.year = params.year;
    album.image = 'null';
    album.artist = params.artist; 
    album.save((err, albumStored)=>{
        if (err){
            res.status(500).send({message: 'Error en la peticion'});
        }else {
            if (!albumStored){
                res.status(404).send({message: 'No se ha guardado el album'});
            }else{
                res.status(200).send({album: albumStored});
            }
        }
    });
}

function deleteAlbum (req, res){
    let albumId = req.params.id;

    Album.findByIdAndRemove(albumId, (err, albumRemoved)=>{
        if (err){
            res.status(500).send({message: 'Error al borrar'});
        }else {
            if (!albumRemoved){
                res.status(404).send({message: 'Album no encontrado'});
            }else {
                Song.find({album: albumRemoved._id}).remove((err, songRemoved)=>{
                    if (err){
                        res.status(500).send({message: 'Error al borrar cancion'});
                    }else {
                        if (!songRemoved){
                            res.status(404).send({message: 'Cancion no encontrado'});
                        }else {
                            res.status(200).send ({album: albumRemoved});
                        };
                    };
                });
            };                
        };
    });
}
module.exports = {
    getAlbum,
    saveAlbum,
    getAlbums,
    updateAlbum,
    deleteAlbum
};