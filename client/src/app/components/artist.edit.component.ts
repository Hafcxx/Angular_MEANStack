import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../services/user.service';
import { UploadService } from '../services/upload.service';
import { ArtistService } from '../services/artist.service';
import { Artist } from '../models/artist';
import {GLOBAL} from '../services/global';

@Component ({
    selector: 'artist-edit',
    templateUrl: '../views/artist-create.html',
    providers: [UserService, ArtistService, UploadService]
})

export class ArtistEditComponent implements OnInit{
    public titulo: string; 
    public artist: Artist;
    public identity;
    public token;
    public url: string;
    public errorMessage: string;
    public is_edit;
    public filesToUpload: Array<File>;

    constructor (
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _artistService: ArtistService,
        private _uploadService: UploadService
    ) {
        this.titulo = 'Editar arista';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
        this.artist = new Artist(0,'','','');
        this.errorMessage = "";
        this.is_edit = true;
        this.filesToUpload = [];

    }

    ngOnInit (){
        console.log('artist-list.component cargado');
        console.log(this.artist);
        this.getArtist();
        console.log(this.artist);
    }

    getArtist(){
        this._route.params.forEach((params: Params) =>{
            let id = params['id'];

            this._artistService.getArtist(this.token, id).subscribe({
                next: (v:any) => {
                    
                    if(!v.artist){
                        this._router.navigate(['/'])
                    }else {
                        this.artist = v.artist;
                        console.log(this.artist);
                        //this._router.navigate(['/editar-artista'], v.artist._id)
                    }
                },
                error : (e:any) =>{
                    this.errorMessage = e.error.message;
                    console.log(e);
                },
                complete :() =>{
    
                }
            })

        });
    }

    onSubmit(){
        this._route.params.forEach((params: Params) =>{
            let id = params['id'];
            console.log(id);
            console.log(this.artist);
            this._artistService.editArtist(this.token, id,this.artist).subscribe({
                next: (v:any) => {
                    
                    if(!v.artist){
                        alert('Erro en el servidor');
                    }else {
                        this.artist = v.artist;
                        this.errorMessage = "El artista se ha actualizado correctamente";
                        
                        //subimos la imagen del artista
                        this._uploadService.makeFileRequest(
                            this.url+'upload-image-artist/'+id,[],
                            this.filesToUpload,
                            this.token,
                            'image')
                            .then(
                                (res) =>{
                                    this._router.navigate(['/artistas', 1]);
                                    
                                },
                                (err) =>{
                                    console.log(err);
                                }
                            );
                    }
                },
                error : (e:any) =>{
                    this.errorMessage = e.error.message;
                    console.log(e);
                },
                complete :() =>{

                }
            })
        });
    }

    
    fileChangeEvent(fileInput: any){
        this.filesToUpload = <Array<File>>fileInput.target.files;
    }
}