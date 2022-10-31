import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Cocktail } from 'src/app/models/cocktail/cocktail.module';
import { lastValueFrom, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { CocktailServiceService } from 'src/app/services/cocktail-test.service';
@Component({
  selector: 'cocktail-preview',
  templateUrl: './cocktail-preview.component.html',
  styleUrls: ['./cocktail-preview.component.scss']
})
export class CocktailPreviewComponent implements OnInit {

  paramsSubscription!: Subscription;

  constructor(  private route: ActivatedRoute ,private cocktailService: CocktailServiceService,
    ) { }

  @Input() cocktail!:Cocktail


  ngOnInit(): void {
  }
  onStar(ev:MouseEvent): void {
    ev.stopPropagation();
    this.cocktailService.save({ ...this.cocktail, isStar: !this.cocktail.isStar })
  }
}
