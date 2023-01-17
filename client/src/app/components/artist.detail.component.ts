import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../services/user.service';
import { ArtistService } from '../services/artist.service';
import { Artist } from '../models/artist';
import {GLOBAL} from '../services/global';

@Component ({
    selector: 'artist-detail',
    templateUrl: '../views/artist-detail.html',
    providers: [UserService, ArtistService]
})

export class ArtistDetailComponent implements OnInit{
    public titulo: string; 
    public identity;
    public token;
    public artist: Artist;
    public url: string;
    public errorMessage: string;
    public is_edit;
    public filesToUpload: Array<File>;

    constructor (
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _artistService: ArtistService
    ) {
        this.titulo = 'Editar arista';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
        this.errorMessage = "";
        this.is_edit = true;
        this.filesToUpload = [];
        this.artist = new Artist(0,'','','');

    }

    ngOnInit (){
        console.log('artist-list.component cargado');
        this.getArtist();
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



}