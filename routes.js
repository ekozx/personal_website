var resume = require('./controllers/resumeController.js');
var blog = require('./controllers/blogController.js');
var projects = require('./controllers/projectsController.js');
var admin = require('./controllers/adminController.js');

module.exports = function(app) {
  app.get('/', projects.index);
  app.get('projects', projects.index);
  app.get('/resume', resume.index);
  app.get('/blog', blog.index);
  app.get('/login', admin.login);
}
