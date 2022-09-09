import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    
   /*  ShoppingListComponent,
    ShoppingEditComponent, */
    //DropdownDirective,
    
    //AuthComponent
    //LoadingSpinnerComponent,
    //AlertComponent,
    //PlaceholderDirective
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule, 
    ReactiveFormsModule,
    //RecipesModule,  //a lazy loaded miatt kellett innen kiszedni
    //ShoppingListModule, //a lazy loaded miatt kellett innen kiszedni
    SharedModule,
    CoreModule,
    //AuthModule
  ],
//  providers: [LoggerService, RecipeService, ShoppingListService, {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
