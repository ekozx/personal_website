exports.login = function(req, res) {
  res.render('login');
};
exports.new = function(req, res) {
  res.render('new');
};
exports.register = function(req, res) {
  res.render('register');
};
exports.newUser = function(req, res) {
  User.register(new User({ username : req.body.username }), req.body.password, function(err, user) {
    if (err) {
      return res.render('register', { user : user });
    }
    passport.authenticate('local')(req, res, function () {
      res.redirect('/');
    });
  });
};
