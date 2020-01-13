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
//var Regex = require("regex");
const XRegExp = require('xregexp');
//const emailRegex = require('email-regex');
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
  let sql = "SELECT * FROM details where student_id = ?";
  let query = connection.query(sql, req.query.student_id, (err, results) => {
    console.log(results);
    if(err) throw err;
    res.render('edit',{
      errors: errors,
      results: results[0]
    });
  });
});
/*
app.post('/add', upload.single('image'), (req, res) => {
  if(req.file) {
    res.json(req.file);
  }
  else throw 'error';
});
*/

//route for insert data
app.post('/add',(req, res) => {
  var errors = {};
  var check ={};
//  var regex = new Regex(/^[A-Z]{1,10}$/);
  let data = {student_id: req.body.student_id, firstname: req.body.firstname, lastname: req.body.lastname, email: req.body.email, password: sha1(req.body.password),mobile: req.body.mobile,image: req.body.image };
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
  if(req.body.firstname === ""|| req.body.lastname === "" || req.body.email === "" || req.body.password === "" || req.body.mobile === ""|| req.body.image === ""){
      res.render('add',{
        results: req.body,
        errors : errors
      });
      }else if (!XRegExp('^[a-zA-Z]{1,10}$').test(req.body.firstname)){
       res.render('add',{
        results: req.body,
        errors : {'firstname': 'Enter a to z limint 10 charater'}
      });
     }else if (!XRegExp('^[a-zA-Z]{1,10}$').test(req.body.lastname)){
       res.render('add',{
        results: req.body,
        errors : {'firstname': 'Enter a to z limint 10 charater'}
      });
     }else if (!XRegExp('^[0-9]{10,10}$').test(req.body.mobile)){
       res.render('add',{
        results: req.body,
        errors : {'mobile': 'Enter Only  numeric limit 10'}
      });
     }else if (!XRegExp('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$').test(req.body.email)){
       res.render('add',{
        results: req.body,
        errors : {'email': 'Fill Proper Email format'}
      });
     }else if (!XRegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})").test(req.body.password)){
       res.render('add',{
        results: req.body,
        errors : {'password': 'password string Contain minmum 8 Charater,one lowercase charater, one uppercase charater, one special charater'}
    });
  }else {
      const sql = "select * from details where email = ?"
      connection.query(sql, req.body.email,(err, results)=>{
      if (err) throw err
      if(Object.keys(results).length > 0 ){
        //console.log("results",results);
      check.emailnotvalid = "This email is already exits";
      res.render('add',{
        results: req.body,
        errors : check
      });
    }
     /* else {
    const sql = "select * from details where (email = ? or mobile = ?)"
    const {email,mobile} = req.body;
      connection.query(sql,[email, mobile], (err, results)=>{
      //console.log("result",results)
        if (err) throw err
        if(Object.keys(results).length > 0 ){
        check.emailorphonenotvalid = "This email or number is already exits";
        res.render('add',{
          results:req.body,
          errors : check
        },);
      }*/
      /*else {
      const sql = "select * from details where mobile = ?"
      connection.query(sql,req.body.mobile,(err, results)=>{
      if (err) throw err
      if(Object.keys(results).length > 0 ){
      checknumber.numbernotvalid = "This mobile is already exits";
      res.render('add',{
        results: req.body,
        errors : checknumber
      });
    }*/else {
        let sql = "INSERT INTO details SET ?";
        let query = connection.query(sql, data,(err, results) => {
          if(err) throw err;
          res.redirect('/');
        });
      }
    })
  }
  /*else if (!emailRegex().test(req.body.email)){
    res.render('add',{
     results: req.body,
     errors : {'email': 'please enter valid email'}
   });
  }*/
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
    let sql = "UPDATE details SET firstname='" + req.body.firstname + "', lastname='" + req.body.lastname + "',email='" + req.body.email + "', password='" + sha1(req.body.password) + "', mobile='" + req.body.mobile +"', image='" + req.body.image + "' WHERE student_id='" + req.body.student_id + "'";
    if (req.body.student_id === "" || req.body.firstname === ""|| req.body.lastname === ""|| req.body.email === "" || req.body.password === "" || req.body.mobile === "" || req.body.image){
      res.render('edit',{
        results: req.body,
        errors: errors
      })
    }
    else if (req.body.image === ""){
      res.render('edit',{
        results: req.body,
        errors : {'image': 'edit image'}
      });
    }
    else if (!XRegExp('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$').test(req.body.email)){
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

//https://medium.com/@nitinpatel_20236/image-upload-via-nodejs-server-3fe7d3faa642