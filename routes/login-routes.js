// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");
var db = require('../models/');
User = db.User;

// Routes
// =============================================================
module.exports = function(app) {

    app.get("/homepage", function(req, res) {
        console.log('app.get("/", function(req, res) {');
        res.sendFile(path.join(__dirname + "/../public/homepage.html"));
    });

    app.get("/", function(req, res) {
        console.log('app.get("/", function(req, res) {');
        res.sendFile(path.join(__dirname + "/../public/login.html"));
    });

    app.get("/signup", function(req, res) {
        console.log('app.get("/signup", function(req, res) {');
        res.sendFile(path.join(__dirname + "/../public/signup.html"));
    });

    app.post('/register', function(req, res) {
        console.log('app.post("/register", function(req, res) {');
        console.log(req.body);
        User.register(req.body.username, req.body.password, function(err, account) {
            if (err) {
                console.log(err);
                return res.json(err); //res.render('register', { account : account });
            }

            res.json('WORKING SON!!!');
            // passport.authenticate('local')(req, res, function () {
            //     res.redirect('/');
            // });
        });
        // }).catch(function (err) {
        //     console.log(err);
        // });
    });

    app.post('/authenticate', function(req, res) {
        console.log('app.post("/authenticate", function(req, res) {');
        console.log(req.body);


        User.register(req.body.username, req.body.password, function(err, account) {
            if (err) {
                console.log(err);
                return res.json(err); //res.render('register', { account : account });
            }

            passport.authenticate('local')(req, res, function() {
                res.redirect('/homepage');
            });
        });
        // }).catch(function (err) {
        //     console.log(err);
        // });
    });

};