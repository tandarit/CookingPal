import { NgModule } from '@angular/core';
import { PreloadAllModules, PreloadingStrategy, RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { RecipesResorverService } from './shared/recipes-resorver.service';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

const routes: Routes = [
  {path: '', redirectTo: '/recipes', resolve: [RecipesResorverService], pathMatch: 'full'},
  {path: 'auth', loadChildren: () => import('./auth/auth.module').then(m=>m.AuthModule)},
  {path: 'recipes', loadChildren: () => import('./recipes/recipes.module').then(m=>m.RecipesModule)},
  {path: 'shopping-list', loadChildren: () => import('./shopping-list/shopping-list.module').then(m=>m.ShoppingListModule)}
  /* {path: 'recipes', component: RecipesComponent, canActivate: [AuthGuard], children: [
    {path: '', component: RecipeStartComponent, resolve: [RecipesResorverService]},
    {path: 'new', component: RecipeEditComponent},
    {path: ':id', component: RecipeDetailComponent, resolve: [RecipesResorverService]},    
    {path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResorverService]}
  ]}, */
  // {path: 'shopping-list', component: ShoppingListComponent},
  //{ path: 'auth', component: AuthComponent }
];
 
@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
