var path = require("path");
var db = require('../models/');
User = db.User;

// 1.) The user starts at '/' (login.html)
//     a.) The user enters username and password and  clicks on Login
//         button and POSTS '/authenticate'.
//         - Success - redirects to '/homepage'
//         - Fail - back to '/' (login.html)
//     b.) The user enters username and password and  clicks on Sign Up
//         button and POSTS '/signup'.
//         - Success - redirects to '/homepage'
//         - Fail - back to '/' (login.html)

module.exports = function(app) {

    // 3 GETS

    // GET 1.) This is the login page were you start. This page can POST a
    // '/authenticate' if the 'Login' button is clicked, or GET the '/signup'
    // page if the 'Register' button is clicked
    app.get("/", function(req, res) {
        console.log('app.get("/", function(req, res) {');
        res.sendFile(path.join(__dirname + "/../public/login.html"));
    });

    // GET 2.) Getting here is the goal. If you have successfully logged in or 
    // successfully registered, you get to go to homepage.
    app.get("/homepage", function(req, res) {
        console.log('app.get("/", function(req, res) {');
        res.sendFile(path.join(__dirname + "/../public/homepage.html"));
    });

    // GET 3.) If you are on the login page and you choose to register as a new
    // user, you need to get this new page. (So it can post a '/register')
    app.get("/signup", function(req, res) {
        console.log('app.get("/signup", function(req, res) {');
        res.sendFile(path.join(__dirname + "/../public/signup.html"));
    });

    // 2 POSTS

    // POST 1.) Attempt to register a new user. If the register succeeds, the 
    // user is re-directed to the '/homepage'. If the registration fails, the
    // user is given an error message. THIS NEEDS IMPROVEMENT FOR A FAILURE
    app.post('/register', function(req, res) {
        console.log('app.post("/register", function(req, res) {');
        console.log(req.body);
        User.register(req.body.username, req.body.password, function(err, account) {
            if (err) {
                console.log(err);
                return res.json(err);
            }
            res.redirect('/homepage');
        });
    });

    // POST 2.) Authenticate a login for a user. The only action taken at this
    // time is re-direction to appropriate pages for success and failure.
    app.post('/login', passport.authenticate('local', {
        successRedirect: '/homepage',
        failureRedirect: '/'
    }));
};