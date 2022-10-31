import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  Router,
} from '@angular/router';
import { lastValueFrom, Subscription } from 'rxjs';
import { Cocktail } from '../../models/cocktail/cocktail.module';
import { CocktailServiceService } from '../../services/cocktail-test.service';


@Component({
  selector: 'cocktail-edit',
  templateUrl: './cocktail-edit.component.html',
  styleUrls: ['./cocktail-edit.component.scss'],
})
export class CocktailEditComponent implements OnInit  {
  cocktail!: Cocktail;
  paramsSubscription!: Subscription;
  isEdit = false;
  ev: any;

  constructor(
    private cocktailService: CocktailServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private loc: Location
    ) {}
    
    


    async ngOnInit(): Promise<void> {
    this.playMusic(this.ev)
    this.paramsSubscription = this.route.params.subscribe(async (params) => {
      const cocktailId = params['id'];
      if (cocktailId) {
        const cocktail = await lastValueFrom(this.cocktailService.getById(cocktailId))
        this.cocktail = cocktail || (this.cocktailService.getEmptyCocktail() as Cocktail);
        this.isEdit = true;
      } else {
        this.cocktail = {
          id: 'new' + this.cocktailService.makeId(),
          name: 'My cocktail',
          imgUrl: 'https://images.freeimages.com/variants/q7orapLrWrXoL5sWvDwKKHJu/b6679d1569eb20491ea73c07cf4bfc2406d426757005363d05f4184a67cad3c1'
        }
        console.log('this.cocktail.id:' , this.cocktail.id)
      }
    });
  }

  async onEditCocktail() {
    await lastValueFrom(this.cocktailService.save(this.cocktail));
    this.router.navigateByUrl('/cocktails');
  }

  async onAddCocktail() {
    await lastValueFrom(this.cocktailService.makeNewCocktail(this.cocktail));
    this.router.navigateByUrl('/cocktails')
  }
  playMusic(ev: any){
    let audio: HTMLAudioElement = new Audio('../../../assets/song1.mp3');
    audio.play();
  }

}

