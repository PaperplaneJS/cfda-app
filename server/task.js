module.exports = function(server, db, url) {
  const taskDB = db.collection('task');

  server.get(`/plan/:planid/task`, (req, res, next) => {
    taskDB.find({ _plan: req.params['planid'] }, (err, data) => {
      res.send(data);
    });

    return next();
  });

  server.get(`/plan/:planid/task/:taskid`, (req, res, next) => {
    taskDB.findOne({ _id: req.params['taskid'], _plan: req.params['planid'] }, (err, data) => {
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