const express = require("express");
const router = express.Router();
const app = express();
//const connection =require("./models/db");
const path = require('path');
//const bodyParser = require('body-parser');
//const sha1 = require ('sha1');

//app.use(bodyParser.urlencoded({extends:true}));
//app.use('views',path.join(__dirname,'views'));
app.set('view engine', 'ejs');

/*app.get('/',(req,res) => {

})*/
module.exports = app;
