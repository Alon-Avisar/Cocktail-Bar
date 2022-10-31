import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CocktailComponent } from './pages/cocktail/cocktail.component';
import { AboutComponent } from './pages/about/about.component';
import { HomeComponent } from './pages/home/home.component';
import { FavoritesComponent } from './cmps/favorites/favorites.component';
import { CocktailDetailsComponent } from './pages/cocktail-details/cocktail-details.component';
import { CocktailEditComponent } from './pages/cocktail-edit/cocktail-edit.component';

const routes: Routes = [
  {path : '' , component: HomeComponent ,},
  {path : 'favorites' , component: FavoritesComponent ,},
  {path : 'cocktails/add' , component: CocktailEditComponent ,},
  {path : 'cocktails' , component: CocktailComponent},
  {path : 'cocktails/:id' , component: CocktailDetailsComponent,},
  {path : 'about' , component: AboutComponent},
  {path : 'edit/:id' , component: CocktailEditComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes , {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
