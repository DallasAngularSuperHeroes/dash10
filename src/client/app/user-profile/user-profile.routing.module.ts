import { NgModule }     from '@angular/core';
import { RouterModule, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserProfileComponent }    from './user-profile.component';
import { ReposComponent } from '../repos/repos.component';
import { FollowersComponent } from '../followers/followers.component';
import { FollowingComponent } from '../following/following.component';
import { UserProfileGuards } from './user-profile.guards';
import { UserProfile } from '../shared/githubsearch/userProfile';

@NgModule({
  imports: [

    RouterModule.forChild([

      {
        path: 'user/:userid',
        component: UserProfileComponent,
        resolve: {
          userProfile: UserProfileGuards,
        },
        canActivate: ['noAname'],
        children: [
          {
            path: '',
            component: ReposComponent,
            // redirectTo: 'repos',
            pathMatch: 'full'
          },
          {
            path: 'repos',
            component: ReposComponent
          },
          {
            path: 'following',
            component: FollowingComponent
          },
          {
            path: 'followers',
            component: FollowersComponent
          },
        ]
      }
    ])
  ],
  providers: [
    UserProfileGuards,
    {
      provide: 'noAname',
      useValue: (route: ActivatedRouteSnapshot): Promise<UserProfile> | boolean => {
        console.log('No A route!');
        return !route.params['userid'].startsWith('a');
      }
    },
  ],
  exports: [
    RouterModule
  ]
})
export class UserProfileRoutingModule {
}
