        //////// Needed resources ////////
const express = require ("express");
const mongodb = require("./Database/MongoDB")
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
const cors = require("cors");
const app = express();

const port = process.env.PORT;

        ////////  Basic Middleware  ////////
app.use(bodyParser.json()); // To parse request bodies
app.use(session({
    secret: "secret",
    resave:false,
    saveUninitialized: true,
}));

//Basic express session initialization
app.use(passport.initialize());

//init passaport on every route call
app.use(passport.session());

//allow passaport to use "express-session"
app.use((req, res, next) => {
    res.setHeader("Access-Controll-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Z-Key"
    );
    res.setHeader("Access-Controll-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

//cors config
app.use(cors());

//path to routes files
app.use("/", require("./Routes/index"));

//Passport config
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
},
    function(acessToken, refreshToken, profile, done) {
        //User.findOrCreate({ github: profile.id }, function(err, user)) {
        return done(null, profile);
    //});
    }
));

passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});

//check if logged in or not
app.get("/", (req, res) => { res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : "Logged Out")});
app.get("/github/callback", passport.authenticate("github", {
    failureRedirect: "/api-docs", session: false}),
    (req, res) => {
        req.session.user = req.user;
        res.redirect("/");
});



        //////// Connect to MongoDB and Iniutialize Server ////////
mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    }
    else {
        app.listen(port, () => {
            console.log(`App is listening to port : ${port}`);
        });
    }
});