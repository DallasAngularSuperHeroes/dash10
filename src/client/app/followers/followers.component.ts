import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GithubsearchService } from '../shared/githubsearch/githubsearch.service';

@Component({
  moduleId: module.id,
  selector: 'github-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.css']
})
export class FollowersComponent implements OnInit {
  followers = {};

  constructor(private route: ActivatedRoute,
              private router: Router,
              private githubsearchService: GithubsearchService) {}

  ngOnInit() {
    this.route.parent.params.subscribe((params: Params) => {
      let userid = params['userid'];
      this.followers = this.githubsearchService.getFollowers(userid);
    });
  }

}
