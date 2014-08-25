var resume = require('./controllers/resumeController.js');
var blog = require('./controllers/blogController.js');
var projects = require('./controllers/projectsController.js');
var admin = require('./controllers/adminController.js');

module.exports = function(app, passport, express) {
  var LocalStrategy = require('passport-local').Strategy;
  var User = require('./models/user.js');
  passport.use(new LocalStrategy(User.authenticate()));
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());

  if (app.get('env') === 'development') {
    app.get('/register', admin.register);
    app.post('/register', admin.newUser);
  }
  app.get('/', projects.index);
  app.get('projects', projects.index);
  app.get('/resume', resume.index);
  app.get('/blog', blog.index);
  app.get('/login', admin.login);
  app.post('/login', passport.authenticate('local', {
    successRedirect: '/new',
    failureRedirect: '/login'
  }));
  app.get('/new', isLoggedIn, admin.new);

  function isLoggedIn(req, res, next) {
    if (req.user) {
      next();
    } else {
      res.redirect('/login');
    }
  }
};
