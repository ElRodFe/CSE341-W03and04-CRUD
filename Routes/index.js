const express = require("express");
const router = express.Router();

    // GET requests
//router.use("/", require("./swagger"));
router.get("/", (req, res) => {
    //#swagger.tags=["Hello World!"]
    res.send("Welcome to the General Autorities Information page!")
});
//router.use("/prophets", require("./prophets"));
//route.use("/apostles", require("./apostles"));

module.exports = router;