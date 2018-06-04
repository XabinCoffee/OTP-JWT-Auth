const admin = require("firebase-admin");

module.exports = function(req, res) {
  if (!req.body.phone) {
    return res.status(422).send({ error: "you must provide phone number" });
  }

  const phone = String(req.body.phone).replace(/[^\d]/g, "");

  admin
    .auth()
    .getUser(phone)
    .then(userRecord => {
      const code = Math.floor(Math.random() * 8999 + 1000);

      // Note:
      // SEND THE VERIFICATION CODE TO THE USER
      // VIA EMAIL, SMS OR WHATEVER.
      // SKIPPING THIS BECAUSE IT'S PRETTY STRAIGHTFORWARD
      // OWN IMPLEMENTATION GOES HERE:


      // AFTER the code has been [[SUCCESSFULLY]] sent, save it to the DB
      admin
        .database()
        .ref("users/" + phone)
        .update({ code: code, valid: true }, () => {
          res.send({ success: true });
        });
    })
    .catch(err => {
      res.status(422).send({ error: "Resource not found" });
    });
};
