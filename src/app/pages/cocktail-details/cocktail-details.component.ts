import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { Cocktail } from 'src/app/models/cocktail/cocktail.module';
import { CocktailServiceService } from 'src/app/services/cocktail-test.service';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'cocktail-details',
  templateUrl: './cocktail-details.component.html',
  styleUrls: ['./cocktail-details.component.scss'],
})
export class CocktailDetailsComponent implements OnInit, OnDestroy {
  constructor(
    private cocktialService: CocktailServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  @Input() cocktailId!: string;
  cocktail!: Cocktail
  paramsSubscription!: Subscription;
  ings: any = [];

  async ngOnInit(): Promise<void> {
    
    this.paramsSubscription = this.route.params.subscribe(async (params) => {
      const cocktailId = params['id'];
      const cocktail : Cocktail | void = await lastValueFrom( this.cocktialService.getById(cocktailId))
      if(!cocktail)  this.router.navigate(['/cocktails'])
      if (!this.cocktail?.ins) {
        const URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${ (cocktailId.slice(0,3) == 'new') ? '16108' : cocktailId }`;
        const res = await lastValueFrom(this.http.get<any>(URL));
        for (let i = 1; i < 11; i++) {
          if (res?.drinks[0][`strIngredient${i}`])
            this.ings.push({
              ing: res?.drinks[0][`strIngredient${i}`],
              measure: res?.drinks[0][`strMeasure${i}`],
            });
        }

        this.cocktail = {
          id: cocktail?.id || res.drinks[0].idDrink,
          name: cocktail?.name || '',
          imgUrl: cocktail?.imgUrl || res.drinks[0].strDrinkThumb,
          // ingrid: cocktail?.ingrid || '',
          ins: res.drinks[0].strInstructions,
          ingsList: this.ings[0].measure,
          glass:  cocktail?.ingsList || '',
        };

        this.cocktialService.update(this.cocktail);
      }
    });
  }


  // this.paramsSubscription = this.route.params.subscribe(async (params) => {
  //   const cocktail = await lastValueFrom(this.cocktialService.getById(params['id']))
  //   if (cocktail) this.cocktail = cocktail;
  //   console.log('this.cocktail:' , this.cocktail)

  // })
  // }

  onBack() {
    this.router.navigate(['/cocktails']);
  }

  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
  }
}
