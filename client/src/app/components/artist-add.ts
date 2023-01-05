import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../services/user.service';
import { ArtistService } from '../services/artist.service';
import { Artist } from '../models/artist';
import {GLOBAL} from '../services/global';

@Component ({
    selector: 'artist-add',
    templateUrl: '../views/artist-add.html',
    providers: [UserService, ArtistService]
})

export class ArtistAddComponent implements OnInit{
    public titulo: string; 
    public artist: Artist;
    public identity;
    public token;
    public url: string;
    public errorMessage: string;

    constructor (
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _artistService: ArtistService
    ) {
        this.titulo = 'Crear nuevo artista';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
        this.artist = new Artist('','','');
        this.errorMessage = "";

    }

    ngOnInit (){
        console.log('artist-list.component cargado');
        //Conseguir el listado de artistas
    }
    onSubmit(){
        console.log(this.artist);
        this._artistService.addArtist(this.token, this.artist).subscribe({
            next: (v:any) => {
                
                if(!v.artist){
                    alert('Erro en el servidor');
                }else {
                    this.artist = v.artist;
                    this.errorMessage = "El artista se ha creado correctamente";
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
    }
}