import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { GLOBAL } from './global';
import { Artist } from '../models/artist';

@Injectable()
export class UploadService{

    public url: string; 

    constructor(private _http: HttpClient){
        this.url = GLOBAL.url;
    }


    makeFileRequest(url: string, params: Array<string>, files: Array<File>, token: string, name:string){
        

        return new Promise(function(resolve, reject){
            var formData:any = new FormData();
            var xhr = new XMLHttpRequest();
            //creamos un formulario xml para enviar archivos en nuestra peticion
            for(var i= 0; i < files.length; i++){
                formData.append(name, files[i], files[i].name);
            }
            
            xhr.onreadystatechange = function(){
                if(xhr.readyState == 4){
                    if(xhr.status == 200){
                        resolve(JSON.parse(xhr.response));
                    }else{
                        reject(xhr.response);
                    } 
                }
            }

            xhr.open('POST', url, true);
            xhr.setRequestHeader('Authorization', token);
            xhr.send(formData);
        });
    }
    
}