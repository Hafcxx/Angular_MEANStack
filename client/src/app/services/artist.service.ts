import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { GLOBAL } from './global';
import { Artist } from '../models/artist';

@Injectable()
export class ArtistService{

    public url: string; 

    constructor(private _http: HttpClient){
        this.url = GLOBAL.url;
    }

    getArtist(token: string, id: string){

        let headers =new HttpHeaders({ 
            'Content-Type':'application/json',
            'Authorization': token
        });

        return this._http.get(this.url+'artist/'+id, {headers})
        .pipe(map(res => res));
    }

    getArtists(token: string, page: string){

        let headers =new HttpHeaders({ 
            'Content-Type':'application/json',
            'Authorization': token
        });

        return this._http.get(this.url+'artists/'+page, {headers})
        .pipe(map(res => res));
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

    editArtist(token: string,id:string, artist: Artist){
        let params = JSON.stringify(artist);
        let headers =new HttpHeaders({ 
            'Content-Type':'application/json',
            'Authorization': token
        });
        return this._http.put(this.url+'artist/'+id, params, {headers})
                .pipe(map((res) => res));
    }

    deleteArtist(token: string, id: string){

        let headers =new HttpHeaders({ 
            'Content-Type':'application/json',
            'Authorization': token
        });

        return this._http.delete(this.url+'artist/'+id, {headers})
        .pipe(map(res => res));
    }

    
}