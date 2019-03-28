module.exports = function(server, db, url) {
  const planDB = db.collection('plan');

  server.get('/plan', (req, res, next) => {
    let cond = {};
    if (req.query['kind']) {
      cond['kind'] = req.query['kind'];
    }

    planDB.find(cond, (err, data) => {
      res.send(data);
    });

    return next();
  });

  server.get(`/plan/:planid`, (req, res, next) => {
    let cond = {};
    cond['_id'] = req.params['planid'];
    if (req.query['kind']) {
      cond['kind'] = req.query['kind'];
    }

    planDB.findOne(cond, (err, data) => {
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