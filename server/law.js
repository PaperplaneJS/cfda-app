module.exports = function(server, db, url) {
  const lawDB = db.collection('law');

  server.get('/law', (req, res, next) => {
    lawDB.find({}, (err, data) => {
      res.send(data);
    });

    return next();
  });

  server.get(`/law/:lawid`, (req, res, next) => {
    lawDB.findOne({ _id: req.params['lawid'] }, (err, data) => {
      res.send(data);
    });

    return next();
  });
}