import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { GLOBAL } from './global';

@Injectable()
export class UserService{

    public url: string; 

    constructor (private _http: HttpClient){
        this.url = GLOBAL.url;
      };

    signUp(){
        return 'Hola mundo desde el servicio'
    }
};