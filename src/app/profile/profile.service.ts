import { Injectable, ViewContainerRef, ComponentFactoryResolver, Component } from '@angular/core';
import { BehaviorSubject, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppService } from '../app.service';
import {UserCardComponent} from './user-card/user-card.component';
import {GuestCardComponent from './guest-card/guest-card.component'

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private isLoggedIn = new BehaviorSubject(false);
  isLoggedIn$ = this.isLoggedIn.asObservable();

  constructor(private appService: AppService) {}

 

  login() {
    this.isLoggedIn.next(true);
  }

  logout() {
    this.isLoggedIn.next(false);
  }

  loadComponent(vcr: ViewContainerRef, cfr: ComponentFactoryResolver, isLoggedIn: boolean) {
   
    let component :any = this.isLoggedIn ? UserCardComponent : GuestCardComponent;
    let componentFactory = cfr.resolveComponentFactory(component.component)
    vcr.clear();
    return vcr.createComponent(componentFactory)
  }
}