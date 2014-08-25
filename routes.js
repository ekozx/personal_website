var resume = require('./controllers/resumeController.js');
var blog = require('./controllers/blogController.js');
var projects = require('./controllers/projectsController.js');
var admin = require('./controllers/adminController.js');

module.exports = function(app, passport, express) {
  var LocalStrategy = require('passport-local').Strategy;
  var User = require('./models/user.js');
  //is this what i want?
  // var adminRouter = express.Router();
  // adminRouter.get('/login', function(req, res) {
  //   res.sendfile('/login');
  // });
  // app.use(require('vhost')('/admin.*', adminRouter));
  // passport.use(new LocalStrategy(User.authenticate()));

  //example code on passports website
  // passport.use(new LocalStrategy(function(username, password, done) {
  //   User.findOne({ username: username }, function(err, user) {
  //     if (err) { return done(err); }
  //     if (!user) {
  //       return done(null, false, { message: 'Incorrect username.' });
  //     }
  //     if (!user.validPassword(password)) {
  //       return done(null, false, { message: 'Incorrect password.' });
  //     }
  //     return done(null, user);
  //   });
  // }));
  passport.use(new LocalStrategy(User.authenticate()));
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());

  if (app.get('env') === 'development') {
    app.get('/register', function(req, res) {
      res.render('register');
    });
    app.post('/register', function(req, res) {
      User.register(new User({ username : req.body.username }), req.body.password, function(err, user) {
        if (err) {
          return res.render('register', { user : user });
        }
        passport.authenticate('local')(req, res, function () {
          res.redirect('/');
        });
      });
    });
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
