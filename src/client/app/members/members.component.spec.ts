import { FormsModule } from '@angular/forms';
import {
  async,
  TestBed
 } from '@angular/core/testing';

import { Observable } from 'rxjs/Observable';

import { MembersComponent } from './members.component';
import { MemberService } from '../shared/member/member.service';

export function main() {
  describe('Members component', () => {

    beforeEach(() => {

      TestBed.configureTestingModule({
        imports: [FormsModule],
        declarations: [MembersComponent],
        providers: [
          { provide: MemberService, useValue: new MockMemberService() }
        ]
      });

    });

    it('should work',
      async(() => {
        TestBed
          .compileComponents()
          .then(() => {
            let fixture = TestBed.createComponent(MembersComponent);
            let membersInstance = fixture.debugElement.componentInstance;
            let membersDOMEl = fixture.debugElement.nativeElement;
            let mockMemberService =
              fixture.debugElement.injector.get<any>(MemberService) as MockMemberService;
            let memberServiceSpy = spyOn(mockMemberService, 'get').and.callThrough();

            mockMemberService.returnValue = ['1', '2', '3'];

            fixture.detectChanges();

            expect(membersInstance.memberService).toEqual(jasmine.any(MockMemberService));
            expect(membersDOMEl.querySelectorAll('li').length).toEqual(3);
            expect(memberServiceSpy.calls.count()).toBe(1);

            membersInstance.newName = 'Minko';
            membersInstance.addName();

            fixture.detectChanges();

            expect(membersDOMEl.querySelectorAll('li').length).toEqual(4);
            expect(membersDOMEl.querySelectorAll('li')[3].textContent).toEqual('Minko');
          });

      }));
  });
}

class MockMemberService {

  returnValue: string[];

  get(): Observable<string[]> {
    return Observable.create((observer: any) => {
      observer.next(this.returnValue);
      observer.complete();
    });
  }
}
