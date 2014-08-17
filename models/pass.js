
var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

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

module.exports = passport;