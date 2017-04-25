import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GithubsearchService } from '../shared/githubsearch/githubsearch.service';
import { UserProfile } from '../shared/githubsearch/userProfile';

@Component({
  moduleId: module.id,
  selector: 'github-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userProfile: UserProfile;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private githubsearchService: GithubsearchService) {
  }

  ngOnInit() {
    this.route.data.subscribe((data: { userProfile: UserProfile }) => {
      this.userProfile = data.userProfile;
    });
  }

}
