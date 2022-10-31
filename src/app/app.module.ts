import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { CocktailComponent } from './pages/cocktail/cocktail.component';
import { CocktailListComponent } from './cmps/cocktail-list/cocktail-list.component';
import { CocktailPreviewComponent } from './cmps/cocktail-preview/cocktail-preview.component';
import { CocktailFilterComponent } from './cmps/cocktail-filter/cocktail-filter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CocktailDetailsComponent } from './pages/cocktail-details/cocktail-details.component';
import { AboutComponent } from './pages/about/about.component';
import { AppHeaderComponent } from './cmps/app-header/app-header.component';
import { HomeComponent } from './pages/home/home.component';
import { CocktailEditComponent } from './pages/cocktail-edit/cocktail-edit.component';
import { FavoritesComponent } from './cmps/favorites/favorites.component';

@NgModule({
  declarations: [
    AppComponent,
    CocktailComponent,
    CocktailListComponent,
    CocktailPreviewComponent,
    CocktailFilterComponent,
    CocktailDetailsComponent,
    AboutComponent,
    AppHeaderComponent,
    HomeComponent,
    CocktailEditComponent,
    FavoritesComponent,
  ],
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
