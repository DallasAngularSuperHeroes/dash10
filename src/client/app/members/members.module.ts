import { NgModule } from '@angular/core';
import { MembersComponent } from './members.component';
import { MembersRoutingModule } from './members-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MemberService } from '../shared/member/member.service';

@NgModule({
  imports: [MembersRoutingModule, SharedModule],
  declarations: [MembersComponent],
  exports: [MembersComponent],
  providers: [MemberService]
})
export class MembersModule { }
