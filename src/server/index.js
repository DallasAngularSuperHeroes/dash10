"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const compression = require("compression");
const routes = require("./routes");
const redis_1 = require("./db/redis");
var _clientDir = '../../client/dev';
var app = express();
function init(port, mode) {
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(bodyParser.text());
    app.use(compression());
    redis_1.Init();
    if (mode === 'dev') {
        app.all('/*', function (req, res, next) {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'X-Requested-With');
            next();
        });
        routes.init(app);
        let root = path.resolve(process.cwd());
        let clientRoot = path.resolve(process.cwd(), './dist/client/dev');
        app.use(express.static(root));
        app.use(express.static(clientRoot));
        var renderIndex = (req, res) => {
            res.sendFile(path.resolve(__dirname, _clientDir + '/index.html'));
        };
        app.get('/*', renderIndex);
    }
    else {
        routes.init(app);
        _clientDir = '../../client/prod';
        app.use('/js', express.static(path.resolve(__dirname, _clientDir + '/js')));
        app.use('/css', express.static(path.resolve(__dirname, _clientDir + '/css')));
        app.use('/assets', express.static(path.resolve(__dirname, _clientDir + '/assets')));
        var renderIndex = function (req, res) {
            res.sendFile(path.resolve(__dirname, _clientDir + '/index.html'));
        };
        app.get('/*', renderIndex);
    }
    return new Promise((resolve, reject) => {
        let server = app.listen(port, () => {
            var port = server.address().port;
            console.log('App is listening on port:' + port);
            resolve(server);
        });
    });
}
exports.init = init;
;
//# sourceMappingURL=index.js.map