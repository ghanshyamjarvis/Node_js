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
const XRegExp = require('xregexp');
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
    var errors={};
  // console.log(req.query);
  let sql = "SELECT * FROM details where email = ?";
  let query = connection.query(sql, req.query.email, (err, results) => {
    console.log(results);
    if(err) throw err;
    res.render('edit',{
      errors: errors,
      results: results[0]
    });
  });
});
//route for insert data
app.post('/add',(req, res) => {
  var errors = {};
  var check = {};
  var emailcheck= {};
  var regex = new Regex(/^[a-zA-Z]{1,10}$/);

  let data = {firstname: req.body.firstname, lastname: req.body.lastname, email: req.body.email, password: sha1(req.body.password),mobile: req.body.mobile};
 /* if(req.body.firstname === "") {
    errors.firstname = "Please enter First Name";
  }
  if(req.body.lastname === "") {
    errors.lastname = "Please enter Last Name";
  }
  if(req.body.email === "") {
    errors.email = "Please enter Email";
  }
  if(req.body.body.password === "") {
    errors.password = "Please enter Password";
  }*/
  errors = checkempty(req.body);
  if(req.body.firstname === ""|| req.body.lastname === "" || req.body.email === "" || req.body.password === "" || req.body.mobile === ""){
      res.render('add',{
        results: req.body,
        errors : errors
      });
     }else if (!XRegExp('^[a-zA-Z]{1,10}$').test(req.body.firstname)){
       res.render('add',{
        results: req.body,
        errors : {'firstname': 'Enter a to z limit 10 charater'}
      });
     }else if (!XRegExp('^[a-zA-Z]{1,10}$').test(req.body.lastname)){
    res.render('add',{
      results: req.body,
      errors : {'lastname': 'Enter a to z limit 10 charater'}
    });
    }else if (!XRegExp('^[0-9]{10,10}$').test(req.body.mobile)){
       res.render('add',{
        results: req.body,
        errors : {'mobile': 'please enter ten digit mobile'}
      });
     }/*else if (!XRegExp(^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$`).test(req.body.email)){
    res.render('add',{
      results: req.body,
      errors : {'email': 'please enter valid email'}
    });
    }*/else if (!emailRegex().test(req.body.email)){
       res.render('add',{
        results: req.body,
        errors : {'email': 'please enter valid email'}
      });
      }else if (!XRegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$').test(req.body.password)){
    res.render('add',{
      results: req.body,
      errors : {'password': 'Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:\n'}
    });
  }else {
        const sql = "select * from details where email = ? ";
        connection.query(sql,req.body.email,(err, results)=>{
          //console.log("database", results);
        if (err) throw err
        if(Object.keys(results).length > 0 ){
            check.emailnotvalid = "This email is already exits";
            res.render('add',{
            results: req.body,
            errors : check,
          });
    }else {
      let sql = "INSERT INTO details SET ?";
      let query = connection.query(sql, data,(err, results) => {
        if(err) throw err;
        res.redirect('/');
      });
    }
  })
  
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
  if(data.mobile === "") {
    errors.mobile = "Please enter mobile";
  }

  return errors;
}

//route for update data
  app.post('/edit', (req, res) => {
    
     var errors = {};
     errors = checkempty(req.body);
    let sql = "UPDATE details SET firstname='" + req.body.firstname + "', lastname='" + req.body.lastname + "', password='" + req.body.password + "' WHERE email='" + req.body.email + "'";
    //console.log("updated recoud",sql);
    if (req.body.firstname === ""|| req.body.lastname === ""|| req.body.email === "" || req.body.password === ""){    
      res.render('edit',{
        results: req.body,
        errors: errors
      })
    }else if (!emailRegex().test(req.body.email)){
       res.render('edit',{
        results: req.body,
        errors : {'email': 'please enter valid email'}
      });
    }else{
    let query = connection.query(sql, (err, results) => {
      if (err) throw err;
      res.redirect('/');
    });
    }
  });
//route for delete data
  app.get('/delete', (req, res) => {
    let sql = "DELETE FROM details WHERE email=?";
    let query = connection.query(sql, req.query.email, (err, results) => {
      if (err) throw err;
      res.redirect('/');
    });
  });


  module.exports = app;
