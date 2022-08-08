import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { DataStorageService } from './data-storage.service';

@Injectable({
  providedIn: 'root'
})
export class RecipesResorverService implements Resolve<Recipe[]> {

  constructor(private dataStorageService: DataStorageService, private recipesService: RecipeService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]>  {
    const recipes = this.recipesService.getRecipes();
    if(recipes.length === 0) {
      console.log(recipes);      
      return this.dataStorageService.featchRecipes();
    }
    else {
      return recipes;
    }
  }
}
