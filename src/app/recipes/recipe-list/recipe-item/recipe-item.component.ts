import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { LoggerService } from 'src/app/Logger/logger.service';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})

export class RecipeItemComponent implements OnInit {
  @Input() recipe !: Recipe;
  @Input() recipeIndex !: number;
    
  constructor(private logger: LoggerService) { }

  ngOnInit() {
    this.logger.info("Recipe-item Init!");
  }
}
