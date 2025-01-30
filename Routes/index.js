const express = require("express");
const passport = require("passport");
const router = express.Router();

    // GET requests
router.use("/", require("./swagger"));
router.get("/", (req, res) => {
    //#swagger.tags=["Home Page"]
    res.send("Welcome to the General Autorities Information page!")
});

//Path to different sub-routes
router.use("/prophets", require("./prophets"));
router.use("/apostles", require("./apostles"));

//Login and logout routes
router.get("/login", passport.authenticate("github"), (req, res) => {});
router.get("/logout", function(req, res, next) {
    req.logout(function(err) {
        if (err) {return next(err)}
        res.redirect("/");
    });
});

module.exports = router;