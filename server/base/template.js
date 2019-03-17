module.exports = function (server, db, url) {
  const templates = db.collection('template');

  server.get(url, (req, res, next) => {
    templates.find({}, (err, data) => {
      res.send(data);
    });

    return next();
  });

  server.get(`${url}/:templateid`, (req, res, next) => {
    templates.findOne({
      template_id: req.params['templateid']
    }, (err, data) => {
      res.send(data);
    });

    return next();
  });
}