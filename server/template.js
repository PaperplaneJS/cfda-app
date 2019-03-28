module.exports = function(server, db, url) {
  const templateDB = db.collection('template');

  server.get('/template', (req, res, next) => {
    templateDB.find({}, (err, data) => {
      res.send(data);
    });

    return next();
  });

  server.get(`/template/:templateid`, (req, res, next) => {
    templateDB.findOne({ _id: req.params['templateid'] }, (err, data) => {
      res.send(data);
    });

    return next();
  });
}