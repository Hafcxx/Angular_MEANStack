import { ModuleWithProviders } from "@angular/core";
import {Routes, RouterModule } from '@angular/router';

//import user 
import { UserEditComponent } from "./components/user-edit.component";

//import artist 
import { ArtistListComponent } from "./components/artist-list.component";
import { ArtistAddComponent } from "./components/artist-add";
import { ArtistEditComponent } from "./components/artist.edit.component";
import { ArtistDetailComponent } from "./components/artist.detail.component";

import { HomeComponent } from "./components/home-component";

const appRoutes: Routes = [

    {path: '', component: HomeComponent}, 
    {path: 'artists/:page', component: ArtistListComponent},
    {path: 'create-artist', component: ArtistAddComponent},
    {path: 'edit-artist/:id', component: ArtistEditComponent},  
    {path: 'artista/:id', component: ArtistDetailComponent},  
    {path: 'mis-datos', component: UserEditComponent},
    {path: '**', component: HomeComponent}

];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any>= RouterModule.forRoot(appRoutes);