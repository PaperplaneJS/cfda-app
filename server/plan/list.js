module.exports = function (server, db, url) {
  const plans = db.collection('plan');

  server.get(url, (req, res, next) => {
    let cond = {};
    if (req.query['kind']) {
      cond['kind'] = req.query['kind'];
    }

    plans.find(cond, (err, data) => {
      res.send(data);
    });

    return next();
  });

  server.get(`${url}/:planid`, (req, res, next) => {
    let cond = {};
    cond['id'] = req.params['planid'];
    if (req.query['kind']) {
      cond['kind'] = req.query['kind'];
    }

    plans.findOne(cond, (err, data) => {
      res.send(data);
    });

    return next();
  });
}