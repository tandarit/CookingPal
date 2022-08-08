import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { throwError, catchError, Subject, tap, BehaviorSubject, Observable, take, exhaustMap } from 'rxjs';
import { LoggerService } from '../Logger/logger.service';
import { AuthService } from './auth.service';
import { User } from './user.model';



@Injectable()
export class AuthInterceptorService implements HttpInterceptor { 

    constructor(private http: HttpClient, private logging: LoggerService, private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.authService.userSubject$.pipe(
            take(1),
            exhaustMap(user => {
                if(!user) {
                    return next.handle(req);
                }
                const modifiedReq = req.clone({params: new HttpParams().set('auth', user.idToken)});
                return next.handle(modifiedReq);
            })
        );


        
    }
}
