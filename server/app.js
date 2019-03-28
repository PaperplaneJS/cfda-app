const restify = require('restify');
const mongojs = require('mongojs');
const path = require('path');
const fs = require('fs');
const sessions = require('client-sessions');
const corsMiddleware = require('restify-cors-middleware');
const uuid = require('./_uuid');

const db = mongojs('127.0.0.1:27017/cfda');
const server = restify.createServer({ name: "cfda_ser" });

server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

const cors = corsMiddleware({
  origins: ['http://127.0.0.1:8080', 'http://localhost:8080'],
  credentials: true
});
server.pre(cors.preflight)
server.use(cors.actual)

function initPath(dir = '') {
  let all = fs.readdirSync(path.join(__dirname, dir));

  let dirs = [],
    files = [];

  all.forEach(f => {
    if (fs.statSync(path.join(__dirname, dir, f)).isDirectory()) {
      dirs.push(f);
    } else if (f !== 'app.js' && !f.startsWith('_') && f.endsWith('.js')) {
      files.push(f)
    }
  });

  dirs.forEach(d => {
    initPath(path.join(dir, d));
  });

  files.forEach(f => {
    let s = require(path.join(__dirname, dir, f));

    let url = dir.length > 0 ? `/${dir}` : '';
    url += `/${f.replace('.js','')}`;

    s(server, db, url);
  })
}

db.collection('config').findOne({}, function(err, data) {
  server.use(sessions({
    cookieName: 'cfdaId',
    secret: data.key,
    duration: 20 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
    cookie: {
      httpOnly: false
    }
  }))

  server.use(function(req, res, next) {
    if (req.path() === '/login') {
      return next();
    }

    if (!req['cfdaId'].staff) {
      res.status(401);
      res.send();
    } else {
      return next();
    }

  })

  initPath();

  server.listen('9000', '127.0.0.1', function() {
    console.log('%s begin.', server.name);
  })
})