var Post = require('../models/post.js');
var Showdown = require('showdown');

exports.index = function(req, res) {
  Post.find(function(err, posts) {
    if (err) return console.error(err);
    res.render('blog', { posts:  posts});
  });
};
exports.single = function(req, res) {
  var converter = new Showdown.converter();

  Post.findOne({indexTitle: req.params.indexTitle}, function(err, post) {
    if (post != null) {
      res.render('single', { post: post, parsedBody: converter.makeHtml(post.body) });
    } else {
      res.redirect('/404');
    }
  });
};
