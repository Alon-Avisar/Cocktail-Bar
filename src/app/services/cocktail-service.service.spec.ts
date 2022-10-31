import { TestBed } from '@angular/core/testing';

import { CocktailServiceService } from './cocktail-test.service';

describe('CocktailTestService', () => {
  let service: CocktailServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CocktailServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
