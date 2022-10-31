import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cocktail, CocktailFilter } from '../models/cocktail/cocktail.module';
import {
  BehaviorSubject,
  lastValueFrom,
  Observable,
  of,
  Subscription,
  throwError,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CocktailServiceService {

  cocktails!: Cocktail[];
  filter: string = '';
  // private cocktailDB: Cocktail[] = JSON.parse( localStorage.getItem('cocktailDB') || '' ) || []

  private _cocktails$ = new BehaviorSubject<Cocktail[]>([]);
  public cocktails$ = this._cocktails$.asObservable();

  private _filterBy$ = new BehaviorSubject<CocktailFilter>({ term: '' });
  public filterBy$ = this._filterBy$.asObservable();

  constructor(private http: HttpClient) {}

  public async loadCocktails(): Promise<any> {
    const URL =
      'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail';

    const cocktailDB = localStorage.getItem('cocktailDB');
    if (!cocktailDB) {
      const res = await lastValueFrom(this.http.get<any>(URL));

      let cocktails = res.drinks.map((drink: any) => ({
        id: drink.idDrink,
        name: drink.strDrink,
        imgUrl: drink.strDrinkThumb,
        isStar: false,
      }));
      console.log('cocktails:', cocktails);
      localStorage.setItem('cocktailDB', JSON.stringify(cocktails));
      this.cocktails = cocktails;
      this._cocktails$.next(this.cocktails);
    } else {
      this.cocktails = JSON.parse(cocktailDB);
    }
    this._cocktails$.next(this.cocktails);
  }

  private _add(cocktail: Cocktail) {
    this.cocktails.push(cocktail);
    this._cocktails$.next(this.cocktails);
    localStorage.setItem('cocktailDB', JSON.stringify(this.cocktails));
    return of(cocktail);
  }

  private _edit(cocktail: Cocktail) {
    const cocktails = this.cocktails;
    const cocktailIdx = cocktails.findIndex(
      (cocktailToFind: any) => cocktailToFind.id === cocktail.id
    );
    cocktails.splice(cocktailIdx, 1, cocktail);
    this._cocktails$.next(cocktails);
    localStorage.setItem('cocktailDB', JSON.stringify(this.cocktails))
    return of(cocktail);
  }

  public save(cocktail: Cocktail) {
      return cocktail.id ? this._edit(cocktail) : this._add(cocktail)
  }
  public makeNewCocktail(cocktail: Cocktail) {
    return cocktail.name ? this._add(cocktail) :of(null);
  }

  public getEmptyCocktail() {
    return { name: '', ingsList: '' };
  }

  async getCocktailDetails(cocktail: Cocktail) {
    let updatedCocktail: Cocktail;
    let ings: any[] = [];
    const URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktail.id}`;
    const res = await lastValueFrom(this.http.get<any>(URL));
    console.log('res:', res);
    for (let i = 1; i < 16; i++) {
      if (res.drinks[0][`strIngredient${i}`])
        ings.push({
          ing: res.drinks[0][`strIngredient${i}`],
          measure: res.drinks[0][`strMeasure${i}`],
        });
    }
    console.log('res.drinks[0]:', res.drinks[0]);

    updatedCocktail = {
      ...cocktail,
      ins: res.drinks[0].strInstructions,
      ingsList: ings,
      glass: res.drinks[0].strGlass,
    };
    return updatedCocktail;
  }

  setFavorites(cocktail:Cocktail){
    if (cocktail.id) {
      const idx = this.cocktails.findIndex(currCocktail=>cocktail.id === currCocktail.id)
      cocktail.isStar = this.cocktails[idx].isStar
      this.cocktails.splice(idx,1,cocktail)
    } else {
      cocktail.id=this.makeId()
      cocktail.isStar = false
      this.cocktails.unshift(cocktail)
    }
    localStorage.setItem('cocktailDB', JSON.stringify(this.cocktails));
    this._cocktails$.next(this.cocktails)
  }



  public update(cocktail: Cocktail) {
    console.log('cocktail from update', cocktail);
    if (cocktail.id) {
      const newCoctails = this.cocktails?.map((currCocktail) =>
        cocktail.id === currCocktail.id
          ? { ...currCocktail, ...cocktail }
          : currCocktail
      );
      this._cocktails$.next(newCoctails);
      return of(cocktail);
    } else {
      this.cocktails?.unshift(cocktail);
    }
    localStorage.setItem('cocktailDB', JSON.stringify(this.cocktails));
    this._cocktails$.next(this.cocktails);
    return of(cocktail);
  }

  public getById(cocktailsId: string): Observable<Cocktail | void> {

    const cocktailDB: Cocktail[] = JSON.parse( localStorage.getItem('cocktailDB') || '' );
     
    if (!cocktailDB) return of();

    const cocktails: Cocktail | undefined = cocktailDB.find(
      (cocktails) => cocktails.id === cocktailsId
    );
    if (cocktails) return of({ ...cocktails });
    return of();
  }

  public setFilter(filterBy: CocktailFilter) {
    this._filterBy$.next(filterBy);
    console.log('filterBy:', filterBy);
    const filteredCocktails = this.cocktails?.filter((cocktail) =>
      cocktail.name.toLowerCase().includes(filterBy.term.toLowerCase())
    );
    this._cocktails$.next(filteredCocktails);
    console.log('filteredCocktails:', filteredCocktails);
    return of('ok');
  }

  makeId(length = 5) {
    var result = '';
    var characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}
