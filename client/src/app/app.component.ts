import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { User} from './models/user';
import { GLOBAL } from './services/global';

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
  public token: any;
  public errorMessage = "";
  public errorRegister = "";
  public user_register: User;
  public url: string; 

  constructor (
    private _userService: UserService
  ){
    this.user = new User ('', '', '', '', '' ,'ROLE_USER','')
    this.user_register = new User ('', '', '', '', '' ,'ROLE_USER','')
    this.identity; 
    this.token;
    this.errorMessage;
    this.errorRegister;
    this.url = GLOBAL.url;
  }

  ngOnInit(){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();

    console.log(this.identity);
    console.log(this.token);
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
          localStorage.setItem('identity',JSON.stringify(identity));
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
                      localStorage.setItem('token',token);
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

  logout (){
    localStorage.removeItem('identity');
    localStorage.removeItem('token');
    localStorage.clear();
    this.identity = null;
    this.token = null;
  }
  
  onSubmitRegister(){
    console.log(this.user_register);

    this._userService.register(this.user_register).subscribe({
      next: (v:any) => {
        let user = v.user;
        this.user_register = user;

        if(!user._id){
          alert('Error al registrarse');
          this.errorRegister = 'Error al registrarse';
        }else {
          this.errorRegister = 'El registro se ha realizado correctamente, identificate con: ' + this.user_register.email;
          this.user_register = new User ('', '', '', '', '' ,'ROLE_USER','');
        }
      },
      error: (e)=>{
        this.errorRegister = e.error.message;
      },
      complete: ()=> {}

    })
  }

}
