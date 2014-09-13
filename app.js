var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var http = require('http');
var app = express();
var creds = require('./credentials.js')
var session = require('express-session');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
// app.use(session);
// TODO: Make a file for the secret
app.use(session({secret: "mySecret", saveUninitialized: true, resave: true}));
// app.use(express.session({ secret: 'keyboard cat' }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());

app.set('port', process.env.PORT || 3000);

//routes:
require('./routes.js')(app, passport, express);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// //Fixture data
// Post.find(function(err, posts) {
//   if (posts.length) return;
//   new Post({
//     title: 'Hello World!',
//     subtitle: 'Welcome to my little corner of the web!',
//     body: 'I created this site for a couple reasons. First, I wanted to have a place where I could write about web development. By writing weekly posts about interesting things I learn in web dev, I\'ll be able to track my progress as a developer. Second, I wanted to make a site using [ember.js](http://emberjs.com/) to gain experience working with the framework. Some of you might be wondering "why on earth would he use a front-end javascript framework for a simple personal site!?". Well, I did and I didn\'t. I used ember to make a content management system for this blog; the actual blog portion of this site does not use ember. If you would like to see a a simplified version of the ember app, check out the [post archive](http://wilfreddenton.com/archive). You can find code for the full ember app on [Github](https://github.com/wilfreddenton/wilfreddenton.com).',
//     created_at: new Date('2014-05-21 17:55:49.000000'),
//     updated_at: new Date('2014-05-26 17:09:30.216780'),
//     published: true
//   }).save();
// });


/// error handlers

// development error handler
// will print stacktrace
switch(app.get('env')) {
  case 'development':
    mongoose.connect('mongodb://localhost/personalSite');
    break;
  // TODO: Create and add credentials file to gitignore
  case 'production':
    mongoose.connect(creds.mongo.connectionString);
    break;
  default:
    throw new Error('Unknown execution environment: ' + app.get('env'));
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;

var server = http.createServer(app).listen(app.get('port'), function() {
  console.log( 'Home started in ' + app.get('env') +
    ' mode on ' + app.get('port'));
});
