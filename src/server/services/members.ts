import * as express from 'express';
import * as redis from 'redis';
import { MemberController } from '../controllers/memberController';

let nameData = require('../data/name.list.json');

export function members(app: express.Application) {

  const memberController = new MemberController();

  app.get('/api/members',  memberController.getAll);

  app.get('/api/member/', function (req, res) {
    memberController.get(req, res);
  });

  app.get('/api/version', function (req, res) {
    res.jsonp('{"version": "2.0"}');
  });

  app.get('/api/version2', (req, res) => {
    res.send('{"version": "1.0"}');
  });

  app.get('/api/members/static',
    (req:any, res:any, next:any) => {

      res.json(nameData);
    });

  /**
   * Get name list.
   * @database
   */
  app.get('/api/members',
    (req:any, res:any, next:any) => {

      let RedisClient = redis.createClient(),
          nameList: string[] = [];

      RedisClient.smembers('members',
        (err:any, replies:any) => {
          console.log(`
          Reply length: ${replies.length}. 
          Reply: ${replies}.`);
          nameList = replies;
          res.json(nameList);
      });

      RedisClient.quit();
    });

  /**
   * Add new name.
   * @database
   */
  app.post('/api/members',
    (req:any, res:any, next:any) => {

      let RedisClient = redis.createClient(),
          request = req.body;
          // request = JSON.parse(req.body);

      RedisClient.sadd('members', request.name,
        (err:any, replies:any) => {
          console.log(`
          Reply: ${replies}.`);

          res.json({success: true});
        });

      RedisClient.quit();
    });

  /**
   * Delete name.
   * @database
   */
  app.delete('/api/members',
    (req:any, res:any, next:any) => {

      let RedisClient = redis.createClient(),
          request = req.body;
          // request = JSON.parse(req.body);

      RedisClient.srem('members', request.name,
        (err:any, replies:any) => {
          console.log(`
          Reply length: ${replies.length}. 
          Reply: ${replies}.`);

          res.json({success: true});
        });

      RedisClient.quit();
    });

}
