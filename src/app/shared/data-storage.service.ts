import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap, take, exhaustMap} from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {  

  constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) { }

  storeRecipes()  {
    const recipes = this.recipeService.getRecipes();

    this.authService.userSubject$.pipe(
      take(1),
      exhaustMap(user => {
        return this.http.put('https://ng-course-recipe-book-9a9ae-default-rtdb.europe-west1.firebasedatabase.app/recipes.json', recipes, 
        {
          params: new HttpParams().set('auth', user!.idToken)
        });
      })
    ).subscribe(res => {
      console.log(res);
    });

   
  }

  featchRecipes()  {
    return this.authService.userSubject$.pipe(
      take(1),
      exhaustMap(user => {
        return this.http.get<Recipe[]>(
          'https://ng-course-recipe-book-9a9ae-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
          {
            params: new HttpParams().set('auth', user!.idToken)
          }
        );
      }),
      map(recipes => {
        return recipes.map(recipe => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : []
          };
        });
      }),
      tap(recipes => {
        this.recipeService.setRecipes(recipes);
      })
    ); 




    /* return this.http.get<Recipe[]>('https://ng-course-recipe-book-9a9ae-default-rtdb.europe-west1.firebasedatabase.app/recipes.json').pipe(map(recipe => {
      return recipe.map(recipe => {
        return {
          ...recipe, 
          ingredients: recipe.ingredients ? recipe.ingredients : []
          }
        });
      }),
      tap(recipe => {
        this.recipeService.setRecipes(recipe);
      }) 
    );     */
  }
}
