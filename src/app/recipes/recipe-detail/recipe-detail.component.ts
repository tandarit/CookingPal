import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { LoggerService } from 'src/app/Logger/logger.service';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  selectedRecipe!: Recipe;
  id!: number;
  
  constructor(private recipeService: RecipeService, private route: ActivatedRoute, private router: Router, private logger: LoggerService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = + params["id"];
        this.selectedRecipe = this.recipeService.getRecipe(this.id);
      }
    );    
  }

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.selectedRecipe.ingredients);
  }

  onEditRecipe() {
    //absulute route adja vissza a relativeTo:
    this.router.navigate(['edit'], {relativeTo: this.route});
    this.logger.info("The id of recipe is "+this.id);
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['recipes']);
    this.logger.info("The id of deleted recipe is "+this.id);
  }
}
