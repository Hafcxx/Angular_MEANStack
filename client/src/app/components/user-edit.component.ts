import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';

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

    constructor(
        private _userService: UserService
    ){
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        
        this.user = this.identity;
        this.alertUpdate;
        this.titulo = ""; 
        this.errorMessage;

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
}