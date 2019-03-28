module.exports = function(server, db, url) {
  const bizDB = db.collection('biz');

  server.get('/biz', (req, res, next) => {
    bizDB.find({}, (err, data) => {
      res.send(data);
    });

    return next();
  });

  server.get(`/biz/:bizid`, (req, res, next) => {
    bizDB.findOne({ _id: req.params['bizid'] }, (err, data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404);
        res.send();
      }
    });

    return next();
  });
}