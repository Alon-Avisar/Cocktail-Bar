export interface Cocktail {
  id?: string;
  name: string;
  imgUrl: string;
  isStar?: boolean;
  ins?: string;
  ingsList?: any;
  ingrid?:any;
  // ingsList: any[];
  glass?: string;



}

export interface CocktailFilter {
  term: string;
}
