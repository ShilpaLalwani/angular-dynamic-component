import { Injectable,ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AppService } from '../app.service';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private isLoggedIn = new BehaviorSubject(false);
  isLoggedIn$ = this.isLoggedIn.asObservable();

  constructor(private appService: AppService,private cfr: ComponentFactoryResolver) {}

  private guestProfile() {
    return () =>
      import('./guest-card/guest-card.component').then(
        m => m.GuestCardComponent
      );
  }

  private clientProfile() {
    return () =>
      import('./user-card/user-card.component').then(
        m => m.UserCardComponent
      );
  }

  login() {
    this.isLoggedIn.next(true);
  }

  logout() {
    this.isLoggedIn.next(false);
  }

  async loadComponent(vcr: ViewContainerRef, isLoggedIn: boolean) {
    vcr.clear();
    const { UserCardComponent } = await import('./user-card/user-card.component');
    return vcr.createComponent(
      this.cfr.resolveComponentFactory(UserCardComponent))

    
    
}}