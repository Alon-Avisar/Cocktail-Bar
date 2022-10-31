import { Component, OnInit , Input, Output, EventEmitter } from '@angular/core';
import { Cocktail } from 'src/app/models/cocktail/cocktail.module';

@Component({
  selector: 'cocktail-list',
  templateUrl: './cocktail-list.component.html',
  styleUrls: ['./cocktail-list.component.scss']
})
export class CocktailListComponent implements OnInit {

  constructor() { }


  @Input() cocktails!:Cocktail[]
  // @Output() selectCocktailId = new EventEmitter<string>()


  ngOnInit(): void {
  }

}
