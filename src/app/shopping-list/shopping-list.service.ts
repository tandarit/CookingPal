import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { LoggerService } from '../Logger/logger.service';
import { RecipeService } from '../recipes/recipe.service';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  startedEditing = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];

  ingredientsChanged = new Subject<Ingredient[]>();  //ez jelzi hogy a service tömbjébe történt változás

  constructor(private logging: LoggerService) {
    
  }

  getIngredient(index:number) {
    this.logging.info("Get ingredient back! " + this.ingredients[index]);
      return this.ingredients[index];
   }

  getIngredients() {
    this.logging.info("Get ingredients back!");
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this.logging.info("Get an ingredient back! "+ "The name is" + ingredient.name);
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice()); 
  }

  addIngredients(ingredients: Ingredient[]) {
    this.logging.info("Add ingredients! ");
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice()); 
  }

  removeIngredient(index:number) {
    this.logging.warn("Ingredient removing started!");
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice()); 
  }

  editIngredient(index:number, ingredient: Ingredient) {
    this.logging.warn("Ingredient editing started!");
    this.ingredients[index]=ingredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
