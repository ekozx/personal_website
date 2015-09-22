var Post = require('../models/post.js');

exports.index = function(req, res) {
  postNames = ["Zapcord", "Visual-Computing-with-Processing", "Neural-Networks-and-Node-JS"];
  posts = [];
  for (var i = 0; i < postNames.length; i++) {
    Post.findOne({indexTitle: postNames[i]}, function(err, post) {
      if(post != null) {
        posts.push(post);
      } else {
        res.render('/404');
      }
      if(posts.length === postNames.length) {
        res.render('index', {posts: posts});
      }
    });
  }
};
exports.processing = function(req, res) {
  res.render('processing');
};
