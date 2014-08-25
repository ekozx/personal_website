exports.login = function(req, res) {
  res.render('login');
};
exports.new = function(req, res) {
  console.log(req.user);
  res.render('new');
};
