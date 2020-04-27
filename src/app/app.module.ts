import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ProfileHostDirective } from './profile/profile-host.directive';
import { ProfileComponent } from './profile/profile.component';
import { GuestProfileComponent } from './profile/guest-profile/guest-profile.component';
import { UserCardComponent } from './profile/user-card/user-card.component';

@NgModule({
  declarations: [AppComponent, ProfileHostDirective, ProfileComponent, GuestProfileComponent, UserCardComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    GuestProfileComponent,
    UserCardComponent
  ]
})
export class AppModule {}