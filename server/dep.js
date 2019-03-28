module.exports = function(server, db, url) {
  const depDB = db.collection('department');
  
  server.get('/dep', (req, res, next) => {
    depDB.find({}, (err, data) => {
      res.send(data);
    });

    return next();
  });

  server.get(`/dep/:depid`, (req, res, next) => {
    depDB.findOne({ _id: req.params['depid'] }, (err, data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404);
        res.send();
      }
    });

    return next();
  });

  server.get('/dep/:depid/child', (req, res, next) => {
    depDB.find({ _id: req.params['depid'] }, (err, data) => {
      if (data) {
        let child = data.child;

      } else {
        res.status(404);
        res.send();
      }
    });

    return next();
  })
}