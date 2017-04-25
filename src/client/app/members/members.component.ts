import { Component, OnInit } from '@angular/core';
import { MemberService } from '../shared/member/member.service';
import {Member} from "../../../server/model/member";

/**
 * This class represents the lazy loaded MembersComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-members',
  templateUrl: 'members.component.html',
  styleUrls: ['members.component.css'],
})
export class MembersComponent implements OnInit {

  member: Member;
  errorMessage: string;
  members: any[] = [];

  /**
   * Creates an instance of the MembersComponent with the injected
   * MemberService.
   *
   * @param {MemberService} memberService - The injected MemberService.
   */
  constructor(public memberService: MemberService) {}

  /**
   * Get the names OnInit
   */
  ngOnInit() {
    this.getMembers();
  }

  /**
   * Handle the memberService observable
   */
  getMembers() {
    this.memberService.get()
      .subscribe(
        members => this.members = members,
        error => this.errorMessage = <any>error
      );
  }

  /**
   * Pushes a new name onto the names array
   * @return {boolean} false to prevent default form submit behavior to refresh the page.
   */
  addMember(): boolean {
    // TODO: implement memberService.post
    this.members.push(this.member);
    this.member = null;
    return false;
  }

}
