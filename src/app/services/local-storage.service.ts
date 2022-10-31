import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Cocktail } from '../models/cocktail/cocktail.module';

const DB = 'cocktailDB';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  public getById(cocktailId: string): Cocktail[] {
    const data = localStorage.getItem(DB);
    console.log('data:', data);
    if (!data) return [];
    return JSON.parse(data).filter(
      (cocktail: Cocktail) => cocktail.id === cocktailId
    );
  }
}
