const express = require("express");
const router = express.Router();
const app = express();
const connection = require("./models/db");
const route = require("./controllers/app_route");
const bodyParser = ('body-parser');
const path = require('path');

//set views file
app.set('views', path.join(__dirname,'views'));
//set view engine
app.set('view engine', 'ejs');

// get all data
app.get('/main',(req, res) => {
  let sql = "SELECT * FROM details";
  let query = connection.query(sql, (err, results) => {
    if(err) throw err;
    res.render('main',{
      results: results
    });
  });
});

//route for insert data
app.post('/save',(req, res) => {
  let data = {FirstName: req.body.Firstname, LastName: req.body.Lastname, Email: req.body.Email, Password: req.body.Password};
  let sql = "INSERT INTO details SET ?";
  let query = connection.query(sql, data,(err, results) => {
    if(err) throw err;
    res.redirect('/ ');
  });
});
//route for update data
app.post('/update',(req, res) => {
  let sql = "UPDATE details SET FirstName='"+req.body.FirstName+"', LastName='"+req.body.LastName+"', Password='"+req.body.Password+"' WHERE product_id="+req.body.id;
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.redirect('/');
  });
});
//route for delete data
app.post('/delete',(req, res) => {
  let sql = "DELETE FROM details WHERE Email="+req.body.Email+"";
  let query = connection.query(sql, (err, results) => {
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