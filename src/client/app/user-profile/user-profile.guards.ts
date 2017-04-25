import { Injectable }             from '@angular/core';
import {
  Router, Resolve, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Route,
  CanLoad, CanDeactivate
} from '@angular/router';

import { GithubsearchService } from '../shared/githubsearch/githubsearch.service';
import { UserProfile } from '../shared/githubsearch/userProfile';
import { Observable } from 'rxjs/Rx';
import { UserProfileComponent } from './user-profile.component';

@Injectable()
export class UserProfileGuards implements Resolve<UserProfile>, CanActivate, CanDeactivate<UserProfileComponent>, CanLoad {
  constructor(private githubsearchService: GithubsearchService, private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<UserProfile> {
    const userid: string = route.params['userid'];
    if (!userid) {
      return undefined;
    }
    return this.githubsearchService.getUserProfile(userid).then(userProfile => {
      if (userProfile && userProfile.login) {
        return userProfile;
      } else {
        return undefined;
      }
    });
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> | boolean {
    return !route.params['userid'].startsWith('a');
  }

  canDeactivate(component: UserProfileComponent, route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean>
    | Promise<boolean>
    | boolean {
    return !component.userProfile.name;
  }

  canLoad(route: Route): boolean {
    let url = `/${route.path}`;

    return false;
  }

}
