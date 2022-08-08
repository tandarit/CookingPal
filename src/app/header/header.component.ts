import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSubscription$!: Subscription; 
  isAuthenticated: boolean = false;
  
  constructor(private dataStorageService: DataStorageService, private authService: AuthService) {}

  ngOnInit(): void {
    this.userSubscription$ = this.authService.userSubject$.subscribe(user => {
      this.isAuthenticated = !!user;
      
    });
  }

  ngOnDestroy(): void {
    this.userSubscription$.unsubscribe();
    
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFeatchData() {
    this.dataStorageService.featchRecipes();
  }

  logout() {
    this.authService.logout();
  }
}
