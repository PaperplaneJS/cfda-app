import restify from 'restify';
import mongojs from 'mongojs';

let server = restify.createServer({
  name: "cfda_ser"
});

let db = mongojs('127.0.0.1:27017/cfda');
let users = db.collection('user');

server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.get('/test', function (req, res, next) {
  users.find({}, function (err, data) {
    res.send(data);
  });

  return next();
});

server.listen('9000', '127.0.0.1', function () {
  console.log('%s begin.', server.name);
})