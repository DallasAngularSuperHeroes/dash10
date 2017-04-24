import {Member} from '../model/member';
import * as _ from 'lodash';
import * as express from 'express';
import { MeetupService } from '../services/meetupService';
const meetupService = MeetupService.instance;

export class MemberController {

  getAll = (req: express.Request, res: express.Response) => {
    meetupService.getAllMembers(function (members) {
      //res.status(200);
      res.send(members);
    });
  }

  get = (req: express.Request, res: express.Response) => {
    const id = req.query.memberId;

    meetupService.getMemberById(id, function (member: Member) {
      res.jsonp(member);

    });
  }

  update = (req: express.Request, res: express.Response) => {
    meetupService.getMemberById(req.body.id, function (member: Member) {
      var newMember = req.body;
      _.forEach(newMember, function (val, key) {
        console.log('101 key ' + key + ' val ' + val);
        member[key] = val;
      });
      meetupService.persistMembers();
      res.send(member);
    });
  }
}


