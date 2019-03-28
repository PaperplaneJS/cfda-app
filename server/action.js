const uuid = require('./_uuid');
const crypto = require('crypto');

function getSHA256(input) {
  return crypto.createHash('sha256').update(input).digest('hex');
}

module.exports = function(server, db, url) {
  const staffDB = db.collection('staff');

  server.post(`/login`, (req, res, next) => {
    const staff = req.body['staff'] || '';
    const pwd = req.body['pwd'] || '';
    const sha256Pwd = getSHA256(pwd);

    staffDB.find({ name: staff, pwd: sha256Pwd }, function(err, data) {
      if (data.length > 0) {
        const staff = data[0];
        req['cfdaId'].staff = staff._id;
        res.send(staff);
      } else {
        res.status(401);
        res.send();
      }
    })
  });

  server.post(`/auth`, (req, res, next) => {
    const cfdaId = req['cfdaId'].staff;
    if (cfdaId) {
      staffDB.findOne({ _id: cfdaId }, function(err, data) {
        if (data) {
          res.send(data);
        }
      })
    } else {
      res.status(401);
      res.send();
    }
  });
}