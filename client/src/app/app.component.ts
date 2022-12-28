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
  public identity; 
  public token;

  constructor (
    private _userService: UserService
  ){
    this.user = new User ('', '', '', '', '' ,'ROLE_USER','')
    this.identity = true; 
    this.token = "";
  }

  ngOnInit(){
    var texto = this._userService.signUp();
    console.log(texto);
  }

  public onSubmit(){
    console.log(this.user);
  }
}
