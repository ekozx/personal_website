exports.index = function(req, res) {
  //TODO: I was here
  Post = require('../models/post.js');
  // console.log(Post);
  Post.find(function(err, posts) {
    if (err) return console.error(err);
    res.render('blog', { posts:  posts});
  });
};
