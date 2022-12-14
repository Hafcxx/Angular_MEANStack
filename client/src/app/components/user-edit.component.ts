import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import {GLOBAL} from '../services/global';

@Component({
    selector: 'user-edit',
    templateUrl: '../views/user-edit.html',
    providers: [UserService]
})

export class UserEditComponent implements OnInit{
    public titulo: string;
    public user: User;
    public identity;
    public token;
    public alertUpdate = "";
    public errorMessage: any;
    public filesToUpload: Array<File>;
    public url: string; 

    constructor(
        private _userService: UserService
    ){
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        
        this.user = this.identity;
        this.alertUpdate;
        this.titulo = ""; 
        this.errorMessage;

        this.filesToUpload =[];

        this.url = GLOBAL.url;
        // LocalStorage

    }


    ngOnInit(): void {
        console.log('user-edit.componentn.ts cargado')
    }

    onSubmit(){
        console.log(this.user);

        this._userService.update_user(this.user).subscribe({
            next: (v:any) => {
                this.user = v.user;

                if(!v.user){
                    this.errorMessage = 'El usuario no se ha actualizado';
                }else {

                    this.user = v.user; 
                    localStorage.setItem('identity', JSON.stringify(v.user));

                    if(!this.filesToUpload){
                        //Redireccion
                    }else{
                        this.makeFileRequest(this.url+'upload-image-user/'+this.user._id, [], this.filesToUpload)
                        .then( (result: any) =>{
                            this.user.image = result.image;
                            localStorage.setItem('identity', JSON.stringify(v.user));

                            let image_path=this.url+'get-image-user/'+this.user.image;
                            document.getElementById('user_image')?.setAttribute('src',image_path);
                            console.log(this.user);
                        });
                    }

                    
                    this.errorMessage = 'actualizado correctamente';
                }
            },
            error: (e) => {
                this.errorMessage = e.error.message;
                console.log(e);
            },
            complete: () => {}
        });
    }

    


    fileChangeEvent(fileInput: any){
        this.filesToUpload = <Array<File>>fileInput.target.files;
        console.log(this.filesToUpload);
    }

    makeFileRequest(url: string, params: Array<string>, files: Array<File>){
        var token = this.token;

        return new Promise(function(resolve, reject){
            var formData:any = new FormData();
            var xhr = new XMLHttpRequest();
            //creamos un formulario xml para enviar archivos en nuestra peticion
            for(var i= 0; i < files.length; i++){
                formData.append('image', files[i], files[i].name);
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