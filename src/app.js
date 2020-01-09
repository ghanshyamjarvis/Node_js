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

//route for insert data
app.post('/add', (req, res) => {
 // console.log(req.body);
  let data = {firstname: req.body.firstname,
             lastname: req.body.lastname,
             email: req.body.email,
             password: req.body.password};
   // console.log("data",data);
  let sql = "INSERT INTO details SET ?";
  let query = connection.query(sql, data,(err, results) => {
    //console.log("sqldata",data);
    if(err) throw err;
    res.redirect('/');
  });
});

app.get('/edit',(req, res) => {
  let sql = "SELECT * FROM details where email = ?";
  let query = connection.query(sql, req.query.email, (err, results) => {
    console.log(results);
    if(err) throw err;
    res.render('edit',{
      results: results
    });
  });
});


//route for update data
app.post('/edit',(req, res) => {
  let sql = "UPDATE details SET firstname='"+req.body.firstname+"', lastname='"+req.body.lastname+"', password='"+req.body.password+"' WHERE email = '"+req.body.email + "'";
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


module.exports = app;