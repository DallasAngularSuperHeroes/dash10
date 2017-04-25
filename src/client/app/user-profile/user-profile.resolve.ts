import { Injectable }             from '@angular/core';
import {Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

import { GithubsearchService } from '../shared/githubsearch.service';
import {UserProfile} from "../shared/userProfile";

@Injectable()
export class UserPofileResolve implements Resolve<UserProfile> {
  constructor(private githubsearchService: GithubsearchService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<UserProfile> {
    const id:string = route.params['userid'];

    return this.githubsearchService.getUserProfile(id).then(userProfile => {
      if (userProfile) {
        return userProfile;
      } else { // id not found
        this.router.navigate(['/']);
        return undefined;
      }
    });
  }
}
