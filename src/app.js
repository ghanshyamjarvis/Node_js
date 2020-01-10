const express = require("express");
const router = express.Router();
const app = express();
const connection = require("./models/db");
const route = require("./controllers/app_route");
const path = require('path');
const bodyParser = require('body-parser');
const sha1 = require('sha1');
//const {check,validationResult} = require('express-validator');
//const { Validator } = require('node-input-validator');
var Regex = require("regex");
const emailRegex = require('email-regex');


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
    errors: {},
    results: {}
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
  // var filter = `^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/`;
 // var regex = new Regex(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/);
  //console.log(emailRegex().test(req.body.email));
  var errors = {};
  var check ={};
  let data = {firstname: req.body.firstname, lastname: req.body.lastname, email: req.body.email, password: sha1(req.body.password)};
  // if(req.body.firstname === "") {
  //   errors.firstname = "Please enter First Name";
  // }
  // if(req.body.lastname === "") {
  //   errors.lastname = "Please enter Last Name";
  // }
  // if(req.body.email === "") {
  //   errors.email = "Please enter Email";
  // }
  // if(req.body.body.password === "") {
  //   errors.password = "Please enter Password";
  // }
  errors = checkempty(req.body);
  //check = findemail(req.body.email);
  if(req.body.firstname === ""|| req.body.lastname === "" || req.body.email === "" || req.body.password === ""){
      res.render('add',{
        results: req.body,
        errors : errors
      });
     }else if (!emailRegex().test(req.body.email)){
       res.render('add',{
        results: req.body,
        errors : {'email': 'please enter valid email'}
      });
  }/*else if (req.body.email===""){
    console.log("req.body.email",req.body.email)
    res.render('add',{
      results:req.body,
      errors: errors
    })
  }*/else {
  //return isEmpty;
  let sql = "INSERT INTO details SET ?";
  let query = connection.query(sql, data,(err, results) => {
    if(err) throw err;
    res.redirect('/');
  });
  }
});

function checkempty(data) {
  var errors = {};
  if(data.firstname === "") {
    errors.firstname = "Please enter First Name";
  }
  if(data.lastname === "") {
    errors.lastname = "Please enter Last Name";
  }
  if(data.email === "") {
    errors.email = "Please enter Email";
  }
  if(data.password === "") {
    errors.password = "Please enter Password";
  }

  return errors;
}


/*
function findemail(email){
  var check ={};
  //console.log("email",email)
  let sql = "select * from details where email = ?";
  connection.query(sql,[email],(err, results)=>{
      if (email.results == results){
        check.email = "Duplicate Record"
      }
        return
  })
}
*/








//route for update data
  app.post('/edit', (req, res) => {
    let sql = "UPDATE details SET firstname='" + req.body.firstname + "', lastname='" + req.body.lastname + "', password='" + req.body.password + "' WHERE email='" + req.body.email + "'";
    //console.log("updated recoud",sql);
    /*if (req.body.firstname === "" || req.body.lastname === ""){
      res.render('edit',{
        results: req.body,
        errors:{'firstname':'Cannot Place Blank Value','lastname':'Cannot Place Blank Value'}
      })
    }*/
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
