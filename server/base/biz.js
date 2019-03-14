module.exports = function (server, db, url) {
  server.get(url, function (req, res, next) {
    let bizs = db.collection('biz');
    bizs.find({}, function (err, data) {
      res.send(data);
    });

    return next();
  });

  server.post(url, function (req, res, next) {})
}