"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redis = require("redis");
let nameData = require('../data/name.list.json');
function nameList(app) {
    app.get('/api/name-list/static', (req, res, next) => {
        res.json(nameData);
    });
    app.get('/api/name-list', (req, res, next) => {
        let RedisClient = redis.createClient(), nameList = [];
        RedisClient.smembers('name-list', (err, replies) => {
            console.log(`
          Reply length: ${replies.length}. 
          Reply: ${replies}.`);
            nameList = replies;
            res.json(nameList);
        });
        RedisClient.quit();
    });
    app.post('/api/name-list', (req, res, next) => {
        let RedisClient = redis.createClient(), request = req.body;
        RedisClient.sadd('name-list', request.name, (err, replies) => {
            console.log(`
          Reply: ${replies}.`);
            res.json({ success: true });
        });
        RedisClient.quit();
    });
    app.delete('/api/name-list', (req, res, next) => {
        let RedisClient = redis.createClient(), request = req.body;
        RedisClient.srem('name-list', request.name, (err, replies) => {
            console.log(`
          Reply length: ${replies.length}. 
          Reply: ${replies}.`);
            res.json({ success: true });
        });
        RedisClient.quit();
    });
}
exports.nameList = nameList;
//# sourceMappingURL=name.list.js.map