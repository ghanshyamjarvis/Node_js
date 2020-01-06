const express = require("express");
const router = express.Router();
const app = express();
const connection =require("./models/db");

router.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Expose-Headers', 'X-My-Custom-Header, X-Another-Custom-Header');
  next(); // make sure we go to the next routes and don't stop here
});

app.use =('/user', require('./controllers/app_route'));
module.exports = app;
