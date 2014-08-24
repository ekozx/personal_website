var resume = require('./controllers/resumeController.js');
var blog = require('./controllers/blogController.js');
var projects = require('./controllers/projectsController.js');
var admin = require('./controllers/adminController.js');

module.exports = function(app, passport, express) {
  var LocalStrategy = require('passport-local').Strategy;
  var User = require('./models/user.js')
  var adminRouter = express.Router();
  app.use(require('vhost')('/admin', adminRouter));
  passport.use(new LocalStrategy(User.authenticate()));

  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());
  app.get('/', projects.index);
  app.get('projects', projects.index);
  app.get('/resume', resume.index);
  app.get('/blog', blog.index);
  adminRouter.get('/', function(req, res) {
  if (req.user) {
    res.sendfile('/');
  } else {
    res.redirect('/login');
  }
});
  // adminRouter.get('/admin/login', admin.login);
  // adminRouter.post('/admin/login', passport.authenticate('local', {
  //   successRedirect: '/new',
  //   failureRedirect: '/login'
  // }
  // ));
}

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
