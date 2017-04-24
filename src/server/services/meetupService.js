"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const http = require("http");
class MeetupService {
    constructor() {
        this.meetupSigId = '';
        this.meetupSig = '';
        this.filename = 'data/meetupMembers.json';
        this.meetupServer = {
            host: 'api.meetup.com',
            path: ''
        };
        this.meetupCbFactory = (cb) => {
            return (response) => {
                var str = '';
                response.on('data', (chunk) => {
                    str += chunk;
                });
                response.on('end', () => {
                    cb(str);
                });
            };
        };
        this.persistMembers = () => {
            fs.writeFileSync(this.filename, JSON.stringify({ results: this.members }));
        };
        this.fetchMembers = (cb) => {
            const srv = this;
            const httpCallback = this.meetupCbFactory((dataText) => {
                if (dataText && dataText.substring(0, 12) !== '{"details":"') {
                    fs.writeFileSync(this.filename, dataText);
                }
                else {
                    dataText = fs.readFileSync(this.filename);
                }
                srv.members = JSON.parse(dataText).results;
                srv.members = JSON.parse(dataText).results;
                cb(srv.members);
            });
            http.request(this.meetupServer, httpCallback).end();
        };
        this.init = (cb) => {
            var srv = this;
            if (!this.members) {
                srv.fetchMembers(() => {
                    srv.membersById = {};
                    srv.members.forEach((member) => {
                        srv.membersById[member.id] = member;
                    });
                    cb(srv.members);
                });
            }
            else {
                cb(srv.members);
            }
        };
        this.getAllMembers = (cb) => {
            exports.init(cb);
            return this.members;
        };
        this.getMemberById = (id, cb) => {
            var srv = this;
            this.init(() => {
                var member = srv.membersById[id];
                cb(member);
            });
        };
        this.saveAll = (members, cb) => {
            var json = JSON.stringify(members);
            fs.writeFile(this.filename, json, cb);
        };
    }
}
MeetupService.instance = new MeetupService();
exports.MeetupService = MeetupService;
//# sourceMappingURL=meetupService.js.map