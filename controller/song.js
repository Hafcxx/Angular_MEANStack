'use strict'
const path = require('path');
const fs = require('fs');
const mongoosePaginate  = require('mongoose-pagination');

const Artist = require ('../models/artist');
const Album = require ('../models/album');
const Song = require ('../models/song');
const { restart } = require('nodemon');

function uploadImage (req, res){
    let albumId = req.params.id;
    let file_name = 'No subido...';

    if(req.files){
        let file_path = req.files.image.path; 
        let file_split = file_path.split('\\')
        let file_name = file_split[2];
        let ext_split = file_name.split('\.')
        let file_ext = ext_split[1]

        if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif' ){

            Album.findByIdAndUpdate(albumId, {image: file_name}, (err, albumUpdate) =>{
                if (!albumUpdate ){
                        res.status(404).send ({message: 'No se ha podido acutalizar el usuario'});
                }else{
                    if(err){
                        res.status(500).send (err);
                    }else{
                    res.status(200).send({album: albumUpdate})}
                }
            });

        }else {
            res.status(200).send({message: 'Extensión del archivo no valida'})
        }
    }else{
        req.status(200).send({message: 'No has subido ninguna imagen...'})
    }
}

function getImageFile(req, res){
    let imageFile = req.params.imageFile;
    let path_file = './uploads/albums/'+imageFile
    fs.exists(path_file, function(exists){
        if(exists){
            res.sendFile(path.resolve(path_file));
        }else{
            res.status(200).send({message: 'No existe la imagen'});
        }
    });
}

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

function getSongs (req, res){
    let albumId = req.params.album;
    let find;
    if(!albumId){
        find = Song.find({}).sort('id');
    }else{
        find = Song.find({album: albumId}).sort('number');
    }

    find.populate({path: 'album', populate: {path: 'artist', model: 'Artist'}})
    .exec((err, songs) =>{
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }else{
            if(!songs){
                res.status(404).send({message: 'No hay canciones'});
            }else{
                res.status(200).send({songs});
            }
        }
    });
}

function getSong(req, res){
    let songId = req.params.id;

    Song.findById(songId).populate({path: 'album'}).exec((err, song)=>{
        if (err){
            res.status(500).send({message: 'Error en la id'});
        }else {
            if(!song){
                res.status(404).send({message: 'No existe la canción'});
            }else{
                res.status(200).send({song})
            }
        }
    })
}

function saveSong (req, res){
    let song = new Song();
    let params = req.body; 

    song.number = params.number; 
    song.name = params.name; 
    song.duration = params.duration;
    song.file = 'null';
    song.album = params.album; 
    song.save((err, songStored)=>{
        if (err){
            res.status(500).send({message: 'Error en la peticion'});
        }else {
            if (!songStored){
                res.status(404).send({message: 'No se ha guardado la cancion'});
            }else{
                res.status(200).send({song: songStored});
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
    getSong,
    getSongs,
    saveSong,
};