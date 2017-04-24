"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redis = require("redis");
function Init() {
    let RedisClient = redis.createClient();
    RedisClient.sadd("name-list", "Edsger Dijkstra", "Donald Knuth", "Alan Turing", "Grace Hopper", redis.print);
    RedisClient.quit();
}
exports.Init = Init;
//# sourceMappingURL=redis.js.map