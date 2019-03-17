module.exports = function (server, db, url) {
  const bizs = db.collection('biz');

  server.get(url, (req, res, next) => {
    bizs.find({}, (err, data) => {
      res.send(data);
    });

    return next();
  });

  server.get(`${url}/:bizid`, (req, res, next) => {
    bizs.findOne({
      com_id: req.params['bizid']
    }, (err, data) => {
      res.send(data);
    });

    return next();
  });
}