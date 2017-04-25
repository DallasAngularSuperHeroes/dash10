import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';
import { FollowersComponent }    from './followers.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'followers',
        component: FollowersComponent
      },
    ])
  ],
  exports: [RouterModule]
})
export class FollowersRoutingModule { }
