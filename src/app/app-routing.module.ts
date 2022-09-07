import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { RecipesResorverService } from './shared/recipes-resorver.service';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

const routes: Routes = [
  {path: '', redirectTo: '/recipes', resolve: [RecipesResorverService], pathMatch: 'full'},
  /* {path: 'recipes', component: RecipesComponent, canActivate: [AuthGuard], children: [
    {path: '', component: RecipeStartComponent, resolve: [RecipesResorverService]},
    {path: 'new', component: RecipeEditComponent},
    {path: ':id', component: RecipeDetailComponent, resolve: [RecipesResorverService]},    
    {path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResorverService]}
  ]}, */
   {path: 'shopping-list', component: ShoppingListComponent},
  { path: 'auth', component: AuthComponent }
];
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
