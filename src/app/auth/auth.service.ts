import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { Router } from '@angular/router';
import { throwError, catchError, Subject, tap, BehaviorSubject } from 'rxjs';
import { LoggerService } from '../Logger/logger.service';
import { RecipeService } from '../recipes/recipe.service';
import { User } from './user.model';


interface AuthResponseData {
  idToken:	string; //	A Firebase Auth ID token for the newly created user.
  email:	string; //	The email for the newly created user.
  refreshToken:	string; //	A Firebase Auth refresh token for the newly created user.
  expiresIn:	string; //	The number of seconds in which the ID token expires.
  localId:	string; //	The uid of the newly created user.
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  tokenExperitionTimer!: any;
  userSubject$ = new BehaviorSubject<User|null>(null);
  token!: string;

  constructor(private http: HttpClient, private recipeService: RecipeService, private logging: LoggerService, private router: Router) { }

  signup(email: string, password: string) {
    this.logging.info("SignUp starting!");
    return this.http.post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBWC82gFDA0faT-jQwQ45qy8uuuLeJ55q0",
    {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(catchError(this.handleError), 
        tap(resData => {
          this.handleAuthentication(resData.idToken, resData.email, resData.refreshToken, resData.expiresIn, resData.localId);
      }))
  }

  login(email: string, password: string) {
    this.logging.info("Login starting!");
    return this.http.post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBWC82gFDA0faT-jQwQ45qy8uuuLeJ55q0",
    {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(catchError(this.handleError), 
        tap(resData => {
          this.handleAuthentication(resData.idToken, resData.email, resData.refreshToken, resData.expiresIn, resData.localId);
      }))
  }

  logout() {
    this.logging.info("The logout process was started!");
    this.userSubject$.next(null);
    localStorage.removeItem('userData');
    this.recipeService.setRecipes([]);
    this.router.navigate(['/auth']);
    if(this.tokenExperitionTimer) {
      clearTimeout(this.tokenExperitionTimer);
    }        
    this.tokenExperitionTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExperitionTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  autoLogin() {
    let jsonString: string  = localStorage.getItem('userData') || '{}';
    const userData: {
      idToken: string,
      email: string,
      refreshToken: string,
      expiresIn: string,
      localId: string
    } = JSON.parse(jsonString);

    if(!userData) {
      return;
    }

    const loadUser = new User(userData.idToken, userData.email, userData.refreshToken, userData.expiresIn, userData.localId);
    console.log(loadUser);

    //refresh token miatt kelhet és a logout miatt is!!!!
    if(loadUser.token) {
      this.userSubject$.next(loadUser);
      const expTime = new Date(loadUser.expiresIn).getTime() - new Date().getTime();
      this.logging.info("Time remain: "+ expTime);
      this.autoLogout(expTime);
    }
  } 

  private handleAuthentication(
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string
  ) {    
    const user = new User(idToken, email, refreshToken, expiresIn, localId);
    this.userSubject$.next(user);
    this.autoLogout(Number(expiresIn)*1000);

    //Store datas to local storages
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct.';
        break;
      case "OPERATION_NOT_ALLOWED":
          errorMessage = "This operation is not allowed!";
          break; 
      case "TOO_MANY_ATTEMPTS_TRY_LATER":
          errorMessage = "Too many attempts! Try later please!";
          break;
      case "USER_DISABLED":
          errorMessage = "User disabled!";
          break;  
    }
    return throwError(errorMessage);
  } 
}
