    //Needed resources
const express = require ("express");
const mongodb = require("./Database/MongoDB")
const bodyParser = require("body-parser");
const app = express();

const port = process.env.PORT || 8080;

    //Basic Middleware
app.use(bodyParser.json()); // To parse request bodies
app.use((req, res, next) => {
    res.setHeader("Access-Controll-Allow-Origin", "*");
    res.setHeader(
        "Acess-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Z-Key"
    );
    res.setHeader("Acess-Controll-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});
app.use("/", require("./Routes/index"));

    //Connect to MongoDB and Iniutialize Server
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