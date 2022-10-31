import { Component, OnDestroy, OnInit } from '@angular/core';
import { lastValueFrom, Observable, Subscription } from 'rxjs';
import { CocktailServiceService } from 'src/app/services/cocktail-test.service';
import { Cocktail } from 'src/app/models/cocktail/cocktail.module';

@Component({
  selector: 'cocktail',
  templateUrl: './cocktail.component.html',
  styleUrls: ['./cocktail.component.scss'],
})
export class CocktailComponent implements OnInit, OnDestroy {
  cocktails!: Cocktail[];
  cocktail$!: Observable<Cocktail>;
  Subscription!: Subscription;

  constructor(private cocktailService: CocktailServiceService) {}

  async ngOnInit(): Promise<void> {
    this.cocktailService.loadCocktails();
    this.Subscription = this.cocktailService.cocktails$.subscribe(
      (cocktails) => {
        this.cocktails = cocktails;
        console.log('cocktails:', cocktails);
      }
    );
  }

  ngOnDestroy(): void {
    this.Subscription.unsubscribe();
  }
}
