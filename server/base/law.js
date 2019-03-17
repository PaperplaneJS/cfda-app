module.exports = function (server, db, url) {
  const laws = db.collection('law');

  server.get(url, (req, res, next) => {
    laws.find({}, (err, data) => {
      res.send(data);
    });

    return next();
  });

  server.get(`${url}/:lawid`, (req, res, next) => {
    laws.findOne({
      law_id: req.params['lawid']
    }, (err, data) => {
      res.send(data);
    });
    
    return next();
  });
}