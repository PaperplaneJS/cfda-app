const restify = require('restify');
const mongojs = require('mongojs');
const path = require('path');
const fs = require('fs');

const server = restify.createServer({
  name: "cfda_ser"
});

const db = mongojs('127.0.0.1:27017/cfda');

server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

function initPath(dir = '') {
  let all = fs.readdirSync(path.join(__dirname, dir));

  let dirs = [],
    files = [];

  all.forEach(f => {
    if (fs.statSync(path.join(__dirname, dir, f)).isDirectory()) {
      dirs.push(f);
    } else if (dir !== '' && f.endsWith('.js')) {
      files.push(f)
    }
  });

  dirs.forEach(d => {
    initPath(path.join(dir, d));
  });

  files.forEach(f => {
    let s = require(path.join(__dirname, dir, f));
    let url = `/${dir}/${f.replace('.js','')}`;

    s(server, db, url);

    console.log('API_url:[', url, ']');
  })
}

initPath();

server.listen('9000', '127.0.0.1', function () {
  console.log('%s begin.', server.name);
})