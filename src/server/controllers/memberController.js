"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const meetupService_1 = require("../services/meetupService");
const meetupService = meetupService_1.MeetupService.instance;
class MemberController {
    constructor() {
        this.getAll = (req, res) => {
            meetupService.getAllMembers(function (members) {
                res.send(members);
            });
        };
        this.get = (req, res) => {
            const id = req.query.memberId;
            meetupService.getMemberById(id, function (member) {
                res.jsonp(member);
            });
        };
        this.update = (req, res) => {
            meetupService.getMemberById(req.body.id, function (member) {
                var newMember = req.body;
                _.forEach(newMember, function (val, key) {
                    console.log('101 key ' + key + ' val ' + val);
                    member[key] = val;
                });
                meetupService.persistMembers();
                res.send(member);
            });
        };
    }
}
exports.MemberController = MemberController;
//# sourceMappingURL=memberController.js.map