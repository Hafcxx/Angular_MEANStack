import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { GLOBAL } from './global';

@Injectable()
export class UserService{

    public url: string; 

    constructor (private _http: HttpClient){
        this.url = GLOBAL.url;
      };

    signUp(user_to_login:any, gethash?: any){

        if(gethash !=null){
            user_to_login.gethash = gethash;
        }
        
        let json = JSON.stringify(user_to_login);
        let params = json; 

        let headers = new HttpHeaders({
            'Content-Type':'application/json'
        });

        return this._http.post(this.url+'login', params, {headers: headers})
                        .pipe(map((res) => res));
    }

    register (user_to_register: object){

        let params = JSON.stringify(user_to_register);

        let headers = new HttpHeaders({ 'Content-Type':'application/json'});

        return this._http.post(this.url+'register', params, {headers: headers})
                        .pipe(map((res) => res));
    }

    update_user(user_to_update: any){
      let params = JSON.stringify(user_to_update);

      let headers = new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization': this.getToken()
      });

      return this._http.put(this.url+'update-user/'+user_to_update._id, params, {headers: headers})
                      .pipe(map((res) => res));
    }

    getIdentity (){
        let identityString = localStorage.getItem('identity')+"";
        let identity;
        if (identityString != ""){
          identity = JSON.parse(identityString);
        }
        return identity;
      }
    
      getToken(){
        let tokenString = localStorage.getItem('token')+"";
        return tokenString;
      }
};