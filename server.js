var express = require('express');
var passport = require('passport');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var path = require('path');
var db = require('./models/');
User = db.User;
var app = express();


app.use(bodyParser());
app.use(require('connect-multiparty')());
app.use(cookieParser());
app.use(session({ secret: 'super-secret' }));

app.use(passport.initialize());
app.use(passport.session());

var PORT = 8000;

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

require("./routes/login-routes.js")(app);


db.sequelize.sync({}).then(function() {
    app.listen(PORT, function() {
        console.log('listening on port ' + PORT)
    });
});