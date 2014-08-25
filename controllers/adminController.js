exports.login = function(req, res) {
  res.render('login');
};
exports.new = function(req, res) {
  res.render('new');
};
exports.register = function(req, res) {
  res.render('register');
};
exports.createUser = function(req, res) {
  var User = require('../models/user.js');
  User.register(new User({ username : req.body.username }), req.body.password, function(err, user) {
    if (err) {
      return res.render('register', { user : user });
    }
    passport.authenticate('local')(req, res, function () {
      res.redirect('/');
    });
  });
};
exports.createPost = function(req, res) {
  var Post = require('../models/post.js');
  console.log(req.body.post);
  //TODO: I was here last
  var post = new Post({
    title: req.body.post.title,

  });
};
