import { Injectable, ViewContainerRef, ComponentFactoryResolver, Component } from '@angular/core';
import { BehaviorSubject, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppService } from '../app.service';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private isLoggedIn = new BehaviorSubject(false);
  isLoggedIn$ = this.isLoggedIn.asObservable();

  constructor(private appService: AppService) {}

  private guestProfile() {
    return () =>
      import('./guest-card/guest-card.component').then(
        m => m.GuestCardComponent
      );
  }

  private clientProfile() {
   
      import('./user-card/user-card.component').then(({ UserCardComponent }) => {
      return UserCardComponent
      });
  }

  login() {
    this.isLoggedIn.next(true);
  }

  logout() {
    this.isLoggedIn.next(false);
  }

  loadComponent(vcr: ViewContainerRef, cfr: ComponentFactoryResolver, isLoggedIn: boolean) {
    let component = this.isLoggedIn ? this.clientProfile() : this.guestProfile();
    let componentFactory = cfr.resolveComponentFactory(component)
    vcr.clear();
    return vcr.createComponent(componentFactory)
  }
}