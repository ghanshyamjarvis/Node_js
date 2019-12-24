
//https://www.youtube.com/watch?v=Jtd28GuyHw0


var express = require('express');
var app = express();
var mysql = require('mysql');
var myConnection = require('express-myconnection')
var bodyParser = require('body-parser')
var config = require('./config')


var dbOptions = mysql.createConnection({
  host: config.database.host,
  user: config.database.user,
  password: config.database.password,
  port: config.database.port,
  database: config.database.db,
});

app.use(myConnection(mysql,dbOptions,'pool'));
app.set('view engine','ejs');
app.index = require('./routes/index');

var users =require('./routes/users');
var expressValidator =require('express-validation');
//app.use(expressValidator());
;
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//

/*app.use(methodOverride(function (req,res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body){
    var method =req.body._method
    delete req.body._method
    return method
  }
}))*/

var flash = require('express-flash');
/*var cookieParser = require('cookie-parser');

var sessions = require('express-session');
app.use(cookieParser ('keyboard1'));
app.use(sessions({
  secret:'keyboard1',
  resave:false,
  saveUninitialized:true,
  cookie:{maxAge:60000}
}));*/

app.use(flash());
//app.use('/',index)
app.use('/users',users)


app.listen(3000,function () {
  console.log("Server port 3000")
});

module.exports = app




