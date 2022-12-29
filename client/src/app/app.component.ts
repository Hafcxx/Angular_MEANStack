import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { User} from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})

export class AppComponent implements OnInit{
  public title = 'Musify';
  public user: User;
  public identity: any; 
  public token;
  public errorMessage = "";

  constructor (
    private _userService: UserService
  ){
    this.user = new User ('', '', '', '', '' ,'ROLE_USER','')
    this.identity; 
    this.token = "";
    this.errorMessage;

  }

  ngOnInit(){

  }

  public onSubmit(){
    console.log(this.user);
    
    //Conseguir los datos del usuario identificado
    this._userService.signUp(this.user).subscribe({
       next: (v:any) => {
        let identity = v.user;
        this.identity = identity;

        //
        if(!this.identity._id){
          alert("El usuario no está correctamente identificado");
        }else {
          //Crear elemento en el local storage
          
          //Conseguir el token para enviarselo a cada petición http
                  this._userService.signUp(this.user, 'true').subscribe({
                    next: (v:any) => {
                    let token = v.token;
                    this.token = token;
            
                    //
                    if(this.token.length <=0 ){
                      alert("El token esta mal");
                    }else {
                      //Crear elemento en el local storage para el token

                      console.log(token);
                      console.log(identity);
            
                    }
            
                    },
                    error: (e) => {
                    this.errorMessage = e.error.message;
                    console.log(e);
                  },
                    complete: () => console.info("yeee")
                  }
                )
        }

       },
       error: (e) => {
        this.errorMessage = e.error.message;
        console.log(e);
      },
       complete: () => console.info("yeee")
      }
    )
  }
}
