import { Component, OnInit } from '@angular/core';
import { CocktailServiceService } from 'src/app/services/cocktail-test.service';
import { Cocktail } from 'src/app/models/cocktail/cocktail.module';
import { filter, lastValueFrom, map, Observable, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {
  cocktail!: Cocktail;
  paramsSubscription!: Subscription;
  favs!: Cocktail[];
  constructor(
    private cocktailService: CocktailServiceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.cocktailService.cocktails$.subscribe(
      (cocktails) =>
        (this.favs = cocktails
          .filter((cocktail) => cocktail.isStar))
    );
  }

  async onStar(ev: any, cocktailId: string) {
    ev.stopPropagation();

    this.paramsSubscription = this.route.params.subscribe(async (params) => {
      const cocktailId = params['id'];
      console.log(':cocktailId' , cocktailId)
      
      const cocktailToUpdate: any | Cocktail = await lastValueFrom(
        this.cocktailService.getById(cocktailId)
      );

      cocktailToUpdate.isStar == !cocktailToUpdate.isStar;
      this.cocktailService.setFavorites(cocktailToUpdate);
    });
  }
}
