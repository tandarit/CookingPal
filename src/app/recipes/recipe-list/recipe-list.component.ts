import { Component, OnInit, Output, EventEmitter, OnDestroy} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoggerService } from 'src/app/Logger/logger.service';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy{  
  recipes!: Recipe[];  
  private recipesChangeSub!:Subscription;

  constructor(private recipeService: RecipeService, private router:Router, private route: ActivatedRoute, private logger: LoggerService) { }

  ngOnDestroy(): void {
    this.recipesChangeSub?.unsubscribe();
  }

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
    this.recipesChangeSub = this.recipeService.recipesChanged
      .subscribe(
        (recipes: Recipe[]) => {  //mindig frissitsen mikor változik a lista a servicben!!!!
          this.recipes = recipes;
        }
      );   
  }

  onNewRecipe() {
    this.logger.info("New recipe button was pressed!");
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
