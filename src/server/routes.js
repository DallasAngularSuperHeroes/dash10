"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const services = require("./services/index");
const memberController_1 = require("./controllers/memberController");
const router = express.Router();
function init(app) {
    services.init(app);
    const memberController = new memberController_1.MemberController();
    router.get('/api/members', memberController.getAll);
    router.get('/api/member/', function (req, res) {
        memberController.get(req, res);
    });
    router.get('/api/version/', function (req, res) {
        res.sendStatus(200).send('{"version": "1.0"}');
    });
}
exports.init = init;
//# sourceMappingURL=routes.js.map