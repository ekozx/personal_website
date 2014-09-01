var Post = require('../models/post.js');

exports.index = function(req, res) {
  //TODO: I was here
  Post.find(function(err, posts) {
    if (err) return console.error(err);
    res.render('blog', { posts:  posts});
  });
};
exports.single = function(req, res) {
  Post.findOne({indexTitle: req.params.indexTitle}, function(err, post) {
    if (post != null) {
      res.render('single', { post: post});
    } else {
      res.redirect('/404');
    }
  });
};
