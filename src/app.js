const express = require("express");
const router = express.Router();
const app = express();
const connection = require("./models/db");
const route = require("./controllers/app_route");
const path = require('path');
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: true }));
//set views file
app.set('views', path.join(__dirname,'views'));
//set view engine
app.set('view engine', 'ejs');
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// var urlencodedParser = bodyParser.urlencoded({ extended: false });
// get all data
app.get('/',(req, res) => {
  let sql = "SELECT * FROM details";
  let query = connection.query(sql, (err, results) => {
    if(err) throw err;
    res.render('main',{
      results: results
    });
  });
});

app.get('/add',(req, res) => {
    res.render('add',{
    });
});

app.get('/edit',(req, res) => {
  // console.log(req.query);
  let sql = "SELECT * FROM details where email = ?";
  let query = connection.query(sql, req.query.email, (err, results) => {
    console.log(results);
    if(err) throw err;
    res.render('edit',{
      results: results
    });
  });
});

//route for insert data
app.post('/add', (req, res) => {
  console.log(req.body);
  let data = {firstname: req.body.firstname, lastname: req.body.lastname, email: req.body.email, password: req.body.password};
  let sql = "INSERT INTO details SET ?";
  let query = connection.query(sql, data,(err, results) => {
    if(err) throw err;
    res.redirect('/');
  });
});
//route for update data
app.post('/edit',(req, res) => {
  let sql = "UPDATE details SET firstname='"+req.body.firstname+"', lastname='"+req.body.lastname+"', password='"+req.body.password+"' WHERE email='"+req.body.email + "'";
  let query = connection.query(sql, (err, results) => {
    if(err) throw err;
    res.redirect('/');
  });
});
//route for delete data
app.get('/delete',(req, res) => {
  let sql = "DELETE FROM details WHERE email=?";
  let query = connection.query(sql,req.query.email, (err, results) => {
    if(err) throw err;
    res.redirect('/');
  });
});

/*
var urlencodedParser = bodyParser.urlencoded({ extended: false }));
app.use('/assets', express.static('stuff'));
app.get('/',function (req,res) {
    res.render('index')
});
app.post('/contact', urlencodedParser, function (req,res) {
  console.log(req.body);
  res.render('contact',{qs:req.query})
});
app.get('/contact', function (req,res) {
  res.render('contact', {qs:req.query})
});
*/
module.exports = app;

//http://mfikri.com/en/blog/nodejs-mysql-crud
//https://www.youtube.com/watch?v=QTAYRmMsVCI&list=PL4cUxeGkcC9gcy9lrvMJ75z9maRw4byYp&index=29