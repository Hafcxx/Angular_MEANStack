import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { GLOBAL } from './global';
import { Artist } from '../models/artist';

@Injectable()
export class ArtistService{

    public url: string; 

    constructor(private _http: HttpClient){
        this.url = GLOBAL.url;
    }

    addArtist(token: string, artist: Artist){
        let params = JSON.stringify(artist);
        let headers =new HttpHeaders({ 
            'Content-Type':'application/json',
            'Authorization': token
    });
    return this._http.post(this.url+'artist', params, {headers})
                .pipe(map((res) => res));
    }

    
}