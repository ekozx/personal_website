var Post = require('../models/post.js');

exports.index = function(req, res) {
  posts = [];
  Post.findOne({indexTitle: "Zapcord"}, function(err, post) {
    if (post != null) {
      posts.push(post);
      res.render('index', { posts: posts });
    } else {
      console.log("null post");
      res.redirect('/404');
    }
  });
};
