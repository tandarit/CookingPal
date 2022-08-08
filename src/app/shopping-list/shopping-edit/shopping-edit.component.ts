import { Component, ElementRef, OnInit, Output, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('shoppingListForm', {static: false}) shoppingListForm!: NgForm;
  
  subscription!: Subscription;
  editMode: boolean = false;
  editedItemIndex!: number;
  editedIngredient!: Ingredient;
  
  constructor(private shoppingService: ShoppingListService) { }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();  
  }

  ngOnInit() {
    this.subscription = this.shoppingService.startedEditing.subscribe(
      (index:number) => {
        this.editMode = true;
        this.editedItemIndex = index;
        this.editedIngredient = this.shoppingService.getIngredient(this.editedItemIndex);
        this.shoppingListForm.setValue({
          name: this.editedIngredient.name,
          amount: this.editedIngredient.amount
        });        
      }
    );    
  }

  onAddItem(shoppingListForm: NgForm) {
    const newIngredient = new Ingredient(shoppingListForm.value.name, shoppingListForm.value.amount);
    if(this.editMode == false) {      
      this.shoppingService.addIngredient(newIngredient);
      this.onClearItem();
    }
    else {
      this.editMode = false;
      this.shoppingService.editIngredient(this.editedItemIndex, newIngredient);
      this.onClearItem();
    } 
  }

  onDeleteItem() {
    if(this.editMode) {
      console.log("Deleted item idex: "+this.editedItemIndex);
      this.shoppingService.removeIngredient(this.editedItemIndex);
      this.onClearItem();
      this.editMode=false;
    }
    else {
      alert("Please select an item!");
    }
  }

  onClearItem() {
    this.shoppingListForm.reset();
    this.editMode = false;
  }
}
