import * as fs from 'fs';
import * as http from 'http';
import {Member} from "../model/member";
import {Map} from "gulp-typescript/release/utils";

export class MeetupService {

  public static instance = new MeetupService();

  protected meetupSigId = '';
  protected meetupSig = '';
  protected filename;
  protected meetupServer = {
    host: 'api.meetup.com',
    path: ''
    //path: '/2/members?sig_id=8970895&order=name&group_urlname=DallasAngularJS&sig=7273be2514c75c224229d3e76754de14c550b96d&offset=0&format=json&page=600&offset=1'
    //path: '/2/members?offset=0&format=json&group_urlname=DallasAngularJS&photo-host=public&page=800&order=name&sig_id=' + meetupSigId +
    //'&sig=' + meetupSig
  };

  protected members: Member[];
  protected membersById: Map<Member>;

  constructor() {
    const cwd = __dirname.split('/');
    cwd.splice(-1,1,'data','meetupMembers.json');
    this.filename = cwd.join('/');
  }

  public meetupCbFactory = (cb) => {
    return (response) => {
      var str = '';

      //another chunk of data has been received, so append it to `str`
      response.on('data', (chunk) => {
        str += chunk;
      });

      //the whole response has been received, so we just print it out here
      response.on('end', () => {
        cb(str);
      });
    };
  };

  public persistMembers = () => {
    fs.writeFileSync(this.filename, JSON.stringify({results: this.members}));
  };

  public fetchMembers = (cb) => {
    const srv = this;

    const httpCallback = this.meetupCbFactory((dataText) => {
      if (dataText && dataText.substring(0, 12) !== '{"details":"') {
        fs.writeFileSync(this.filename, dataText);
      } else {
        dataText = fs.readFileSync(this.filename);
      }
      srv.members = JSON.parse(dataText).results;
      //members = global.data;
      srv.members = JSON.parse(dataText).results;

      cb(srv.members);
    });

    http.request(this.meetupServer, httpCallback).end();
  }

  protected init = (cb) => {
    if (!this.members) {
      this.fetchMembers(() => {
        this.membersById = {};
        this.members.forEach( (member) => {
          this.membersById[member.id] = member;
        });
        cb(this.members);
      });
    } else {
      cb(this.members);
    }
  }

  public getAllMembers = (cb) => {
    this.init( () => {
      cb(this.members);
    });
  }

  public getMemberById = (id, cb) => {
    this.init( () => {
      const member = this.membersById[id];
      cb(member);
    });

  }

  public saveAll = (members, cb) => {
    var json = JSON.stringify(members);
    fs.writeFile(this.filename, json, cb);
  }
}

