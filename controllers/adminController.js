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
  var post = new Post({
    title: req.body.post.title,
    indexTitle: req.body.post.title.replace(/ /g, "-"),
    picture: req.body.post.picture,
    preview: req.body.post.preview,
    body: req.body.post.body
  });
  post.save(function(err, p) {
    if (err) return res.send(500, 'Error occurred: unable to create new post');
    var data = preparePost(p);
    res.json({post: data});
  });
};
function preparePost(p) {
  return {
    title: p.title,
    subtitle: p.preview,
    body: p.body,
    updated_at: p.updated_at,
  };
}
