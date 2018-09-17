const mongoose = require('mongoose'),
  bcrypt = require('bcrypt'),
  User = mongoose.model('User');
exports.register = function(req, res) {
  const user = new User({
    username: req.body.username,
    password: req.body.password
  });
  user.save(err => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(user);
    }
  })
};
exports.login = function(req, res) {
  User.findOne({
    username: req.body.username
  }).exec((err, user) => {
    if (err) {
      res.status(500).send(err);
    } else if (!user) {
      res.status(401).send("User not found");
    } else {
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        console.log(req.body.password);
        if (result === true) {
          res.json(user);
        } else {
          res.status(400).send("Username Password not matched");
        }
      })
    }
  });
}
