import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { LoggerService } from 'src/app/Logger/logger.service';
import { FormArray, FormControl,FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id!:number;
  editMode:boolean = false;
  private editRecipe!: Recipe;
  recipeForm!: FormGroup;

  constructor(private logger: LoggerService, private recipeService: RecipeService, private route:ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params:Params) => {
        this.id= +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
        this.logger.info("The edit mode is "+this.editMode);
      }
    );    
  }

 private initForm() {
  
  let recipeName = '';
  let recipeImagePath = '';
  let recipeDescription = '';
  let recipeIngredients = new FormArray([]);

  if(this.editMode) {
    const recipe = this.recipeService.getRecipe(this.id);
    recipeName=recipe.name;
    recipeImagePath=recipe.imagePath;
    recipeDescription=recipe.description;
    if(recipe['ingredients']) {
      for(let ingredient of recipe.ingredients) {
        recipeIngredients.push(
          new FormGroup({
            'name': new FormControl(ingredient.name, Validators.required),
            'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern("^[1-9]+[0-9]*$")])
          })
        );
      }
    }
  }

  this.recipeForm = new FormGroup({
    'name': new FormControl(recipeName, Validators.required),
    'imagePath': new FormControl(recipeImagePath, Validators.required),
    'description': new FormControl(recipeDescription, Validators.required),
    'ingredients': recipeIngredients
  });
 }

 //getter
 get controls() { 
  return (<FormArray>this.recipeForm.get('ingredients')).controls;
}

 onSubmit() {
  const newRecipe = new Recipe(this.recipeForm.get('name')?.value, this.recipeForm.get('description')?.value, this.recipeForm.get('imagePath')?.value, this.recipeForm.get('ingredients')?.value);
  if(this.editMode) {    
    this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    //this.recipeService.updateRecipe(this.id, newRecipe);
  }
  else {
    this.recipeService.addRecipe(newRecipe);
  }
  console.log(this.recipeForm);
  this.onCancel();
 }

 onAddIngredient() {
  (<FormArray>this.recipeForm.get('ingredients')).push(
    new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, [Validators.required, Validators.pattern("^[1-9]+[0-9]*$")])
    })
  );
 }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onRemoveIngredient(index:number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
    //this.recipeService.deleteIngredient(this.id, index);
  }  

}
