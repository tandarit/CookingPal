import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { RecipeService } from '../recipes/recipe.service';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[] = [];
  selectedIngredientItem!:Ingredient;
  private igChangeSub!:Subscription;

  constructor(private shoppingService: ShoppingListService) {}

  ngOnDestroy(): void {
    this.igChangeSub.unsubscribe();
  }

  ngOnInit() {
    this.ingredients = this.shoppingService.getIngredients();    
    this.igChangeSub = this.shoppingService.ingredientsChanged
      .subscribe(
        (ingredients: Ingredient[]) => {  //mindig frissitsen mikor változik a lista a servicben!!!!
          this.ingredients = ingredients;
        }
      );   
  }
  
  onEditItem(index: number) {
    this.shoppingService.startedEditing.next(index);
  }
}
