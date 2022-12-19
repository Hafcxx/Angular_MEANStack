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

function deleteArtist (req, res){
    let artistId = req.params.id;

    Artist.findByIdAndRemove(artistId, (err, artistRemoved) => {
        if (err){
            res.status(500).send({message: 'Error al borrar'});
        }else {
            if (!artistRemoved){
                res.status(404).send({message: 'El artista no ha sido eliminado'});
            }else {
                Album.find({artist: artistRemoved._id}).remove((err, albumRemoved)=>{
                    if (err){
                        res.status(500).send({message: 'Error al borrar'});
                    }else {
                        if (!albumRemoved){
                            res.status(404).send({message: 'Album no encontrado'});
                        }else {
                            Song.find({artist: artistRemoved._id}).remove((err, songRemoved)=>{
                                if (err){
                                    res.status(500).send({message: 'Error al borrar cancion'});
                                }else {
                                    if (!songRemoved){
                                        res.status(404).send({message: 'Cancion no encontrado'});
                                    }else {
                                        res.status(200).send ({message: "Se ha eliminado el artista: "+artistRemoved});
                                    };
                                };
                            });
                        };                
                    };
                });
            }
        }
    });
}

function uploadImage (req, res){
    let artistId = req.params.id;
    let file_name = 'No subido...';

    if(req.files){
        let file_path = req.files.image.path; 
        let file_split = file_path.split('\\')
        let file_name = file_split[2];
        let ext_split = file_name.split('\.')
        let file_ext = ext_split[1]

        if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif' ){

            Artist.findByIdAndUpdate(artistId, {image: file_name}, (err, artistUpdate) =>{
                if (!artistUpdate ){
                    res.status(404).send ({message: 'No se ha podido acutalizar el usuario'});
                }else{
                    res.status(200).send({artist: artistUpdate})}
            });

        }else {
            res.status(200).send({message: 'Extensión del archivo no valida'})
        }
        console.log(file_path);
    }else{
        req.status(200).send({message: 'No has subido ninguna imagen...'})
    }
}

function getImageFile(req, res){
    let imageFile = req.params.imageFile;
    let path_file = './uploads/artists/'+imageFile
    fs.exists(path_file, function(exists){
        if(exists){
            res.sendFile(path.resolve(path_file));
        }else{
            res.status(200).send({message: 'No existe la imagen'});
        }
    });
}
module.exports = {
    getArtist,
    saveArtist,
    getArtists,
    updateArtist,
    deleteArtist,
    uploadImage,
    getImageFile
}