const express = require("express");
const router = express.Router();

    // GET requests
router.use("/", require("./swagger"));
router.get("/", (req, res) => {
    //#swagger.tags=["Home Page"]
    res.send("Welcome to the General Autorities Information page!")
});
router.use("/prophets", require("./prophets"));
router.use("/apostles", require("./apostles"));

module.exports = router;