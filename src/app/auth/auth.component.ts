import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { AuthService } from './auth.service';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive'

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  errorString!: string;
  @ViewChild(PlaceholderDirective, {static: false}) alertHost!: PlaceholderDirective;

  constructor(private authService: AuthService, private route: Router, private viewContainerRef: ViewContainerRef) { }

  ngOnInit(): void {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(authForm: NgForm) {
    if(!authForm.valid) {
      return;
    }

    const email = authForm.value.email;
    const password = authForm.value.password;  
    
    this.isLoading = true;
    console.log(authForm);

    if(this.isLoginMode) {
      this.authService.login(email, password).subscribe(response => {
        console.log(response);
        this.isLoading = false;
        this.route.navigate(["./recipes"]);
      },
      error => {
        this.errorString = error;
        this.isLoading = false;
        this.showErrorAlert(error);
      }
      );
    }
    else {
      this.authService.signup(email, password).subscribe(response => {
        console.log(response);
        this.isLoading = false;
        this.route.navigate(["./recipes"]);
      },
      error => {
        this.errorString = error;
        this.isLoading = false;
        this.showErrorAlert(error);
      }
      );
    }
    authForm.reset();
  }

  onHandleClose() {
    this.errorString = "";

  }

  private showErrorAlert(message: string) {
    //const alertCmp = this.viewContainerRef.
    //const hostViewContainerRef = this.alertHost.viewContainerRef; 

    //hostViewContainerRef.clear();
    //hostViewContainerRef.createComponent(alertCmp);
  }
}

