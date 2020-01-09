const express = require("express");
const router = express.Router();
const app = express();
const connection = require("./models/db");
const route = require("./controllers/app_route");
const path = require('path');
const bodyParser = require('body-parser');
const sha1 = require('sha1');
const {check,validationResult} = require('express-validator');
const { Validator } = require('node-input-validator');

app.use(bodyParser.json());
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
app.post('/add',(req, res) => {
  var filter = `^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/`;
  let data = {firstname: req.body.firstname, lastname: req.body.lastname, email: req.body.email, password: sha1(req.body.password)};
  if(req.body.firstname === ""|| req.body.lastname === "" || req.body.email === "" || req.body.password === ""){
      console.log("Field Cannot Be Empty");
     }else if (req.body.email === filter){
       console.log("Please Enter Proper Email")
  }else {
  //return isEmpty;
  let sql = "INSERT INTO details SET ?";
  let query = connection.query(sql, data,(err, results) => {
    if(err) throw err;
    res.redirect('/');
  });
  }
});
//define router
/*app.post('/app', [
  check('email', 'email is required').isEmail(),
  check('firstname', 'name is required').not().isEmpty(),
  check('password', 'password is required').not().isEmpty(),
], function(req, res, next) {
  //check validate data
  const result = validationResult(req);
  var errors = result.errors;
  for (var key in errors) {
    console.log(errors[key].value);
  }
  if (!result.isEmpty()) {
    //response validate data to register.ejs
    res.render('app', {
      errors: errors
    })
  }
*/

//route for update data
  app.post('/edit', (req, res) => {
    let sql = "UPDATE details SET firstname='" + req.body.firstname + "', lastname='" + req.body.lastname + "', password='" + req.body.password + "' WHERE email='" + req.body.email + "'";
    let query = connection.query(sql, (err, results) => {
      if (err) throw err;
      res.redirect('/');
    });
  });
//route for delete data
  app.get('/delete', (req, res) => {
    let sql = "DELETE FROM details WHERE email=?";
    let query = connection.query(sql, req.query.email, (err, results) => {
      if (err) throw err;
      res.redirect('/');
    });
  });

 /* function checkEmptyInput()
  {
  var isEmpty = false,
    fname = document.getElementById("firstname").value,
    lname = document.getElementById("lastname").value,
    email = document.getElementById("email").value,
    password = document.getElementById("password").value;

  if(firstname === ""|| lastname === "" || email === "" || password === ""){
    alert("Connot Be Empty");
    isEmpty = true;
  }
  return isEmpty;
}

function ValidateEmail(mail)
{
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(myForm.emailAddr.value))
  {
    return (true)
  }
  alert("You have entered an invalid email address!")
  return (false)
}
*/








  module.exports = app;
