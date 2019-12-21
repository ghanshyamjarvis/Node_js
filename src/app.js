const express = require("express");
const router = express.Router;
const path =require("path");
const app =express();
const engine = require("ejs-locals");

//set view engine
app.set("ejs",engine);
app.set("view engine", "ejs");

app.set("views",path.join(__dirname,"./views"));

app.use("/",require("./controller/control"))
app.use("/",router);

module.exports =app;