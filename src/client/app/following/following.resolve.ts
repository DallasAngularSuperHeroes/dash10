import { Injectable }             from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { GithubsearchService } from '../shared/githubsearch/githubsearch.service';
import { UserProfile } from '../shared/githubsearch/userProfile';

@Injectable()
export class FollowingResolve implements Resolve<UserProfile[]> {
  constructor(private githubsearchService: GithubsearchService, private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<UserProfile[]> {
    const id: string = route.params['userid'];

    return this.githubsearchService.getFollowing(id).then(userProfiles => {
      if (userProfiles) {
        return userProfiles;
      } else {
        this.router.navigate(['/']);
        return undefined;
      }
    });
  }
}
