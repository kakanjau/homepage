var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var routes = require('./routes/index');
var users = require('./routes/users');
var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

var config = require('./appconfig');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(passport.initialize());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);


passport.use(new LocalStrategy(
    function(username, password, done){
        var user = {
            id: '1',
            username: 'kakanjau',
            password: 'pass'
        };

        if(username !== user.username) {
            return done(null, false);
        }
        if(password !== user.password) {
            return done(null, false);
        }
        return done(null, user);
    }
));

// 保存user对象
passport.serializeUser(function(user, done){
    done(null, user);
});

// 删除user对象
passport.deserializeUser(function(user, done){
    done(null, user);
});

app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/blog/detail/2/5395cf8bf94816e1e64271ed'
}));

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        status : 500,
        //message: err.message,
        error: {}
    });
});

//mongoose.connect('mongodb://' + config.root.user + ':' + config.root.password + '@' + config.dbconfig.connect + ':' + config.dbconfig.port + '/' + config.dbconfig.schema);
mongoose.connect(config.dbconfig.connect + '/' + config.dbconfig.schema);

module.exports = app;
