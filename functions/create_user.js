const admin = require('firebase-admin');

module.exports = function(req, res) {

  // Request has phone
  if (!req.body.phone) {
    return res.status(422).send({ error: 'Bad Input' });
  }

  // Sanitize input
  const phone = String(req.body.phone).replace(/[^\d]/g,"");

  // Save user
  admin.auth().createUser({ uid: phone })
    .then(user => {
      res.send(user);
    })
    .catch(err => res.status(422).send({ error: err }));

}
