import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { routing, appRoutingProviders } from './app.routing';

import { AppComponent } from './app.component';
import { UserEditComponent } from './components/user-edit.component';
import { ArtistListComponent } from './components/artist-list.component';

@NgModule({
  declarations: [
    AppComponent,
    UserEditComponent,
    ArtistListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routing
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
