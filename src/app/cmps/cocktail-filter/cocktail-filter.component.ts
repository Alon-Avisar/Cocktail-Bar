import { Component, inject, OnInit } from '@angular/core';
import { CocktailFilter } from 'src/app/models/cocktail/cocktail.module';
import { CocktailServiceService } from 'src/app/services/cocktail-test.service';
@Component({
  selector: 'cocktail-filter',
  templateUrl: './cocktail-filter.component.html',
  styleUrls: ['./cocktail-filter.component.scss']
})
export class CocktailFilterComponent implements OnInit {


  cocktailService:CocktailServiceService 
  constructor() {
    this.cocktailService = inject(CocktailServiceService)
   }

   filterBy!:CocktailFilter


   ngOnInit(): void {
        this.cocktailService.filterBy$.subscribe(filterBy => {
        this.filterBy = filterBy
    })
}
onSetFilter(){
  console.log('this,filterBy:' , this.filterBy)
  this.cocktailService.setFilter(this.filterBy)
  
  
}

}

