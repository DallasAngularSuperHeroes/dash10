import * as express from 'express';
import * as services from './services/index';
import { MemberController } from './controllers/memberController';

const router: express.Router = express.Router();

export function init(app: express.Application) {
  services.init(app);

  const memberController = new MemberController();
  router.get('/api/members',  memberController.getAll);
  router.get('/api/member/', function (req, res) {
    memberController.get(req, res);
  });
  router.get('/api/version/', function (req, res) {
    res.sendStatus(200).send('{"version": "1.0"}');
  });
}
