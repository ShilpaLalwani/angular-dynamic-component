import { Injectable,ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AppService } from '../app.service';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private isLoggedIn = new BehaviorSubject(false);
  isLoggedIn$ = this.isLoggedIn.asObservable();

  constructor(private appService: AppService,private cfr: ComponentFactoryResolver) {}

  private async guestProfile() {
   
     const { GuestCardComponent } = await import('./guest-card/guest-card.component');
    return GuestCardComponent
  }

  private async  clientProfile() {
     const { UserCardComponent } = await import('./user-card/user-card.component');
    return UserCardComponent
  }

  login() {
    this.isLoggedIn.next(true);
  }

  logout() {
    this.isLoggedIn.next(false);
  }

  async loadComponent(vcr: ViewContainerRef, isLoggedIn: boolean) {
    vcr.clear();
   let component : any;
   component = isLoggedIn ? this.clientProfile() : this.guestProfile()
    return vcr.createComponent(
      this.cfr.resolveComponentFactory(component))

   
    
}}