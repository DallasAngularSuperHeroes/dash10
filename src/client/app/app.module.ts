import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AboutModule } from './about/about.module';
import { HomeModule } from './home/home.module';
import { SharedModule } from './shared/shared.module';
import { MembersModule } from './members/members.module';
import { FollowersModule } from './followers/followers.module';
import { FollowingModule } from './following/following.module';
import { ReposModule } from './repos/repos.module';
import { WelcomeModule } from './welcome/welcome.module';
import { UserProfileModule } from './user-profile/user-profile.module';


@NgModule({
  imports: [BrowserModule, HttpModule, AppRoutingModule, AboutModule, MembersModule, HomeModule,
    FollowersModule, FollowingModule, ReposModule, WelcomeModule, UserProfileModule,
    SharedModule.forRoot()],
  declarations: [AppComponent],
  providers: [{
    provide: APP_BASE_HREF,
    useValue: '<%= APP_BASE %>'
  }],
  bootstrap: [AppComponent]

})
export class AppModule { }
