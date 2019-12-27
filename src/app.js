const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const db = require('./db')

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

router.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Expose-Headers', 'X-My-Custom-Header, X-Another-Custom-Header');
  next(); // make sure we go to the next routes and don't stop here
});

router.use('/user', require('./controllers/userController'));

app.use('/api', router);

module.exports = app;
