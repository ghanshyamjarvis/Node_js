const express = require("express");
const router = express.Router();
const app = express();
const connection = require("./models/db");
//const route = require("./controllers/app_route");
const path = require('path');
const bodyParser = require('body-parser');
//const sha1 = require('sha1');
//const XRegExp = require('xregexp');
let multer = require('multer');
const DIR = './src/images';

app.use(express.static(path.join(__dirname, 'images')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

let storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, DIR);
  },
  filename: function (req, file, cb) {
    cb(null, file.image + '-' + Date.now() + path.extname(file.originalname));
  }
});
let upload = multer({storage: storage});

app.get('/', (req, res) => {
  let sql = "SELECT * FROM details";
  connection.query(sql, (err, results) => {
    if (err) throw err;
    res.render('main', {
      results: results
    });
  });
});

app.get('/add', (req, res) => {
  res.render('add', {
    errors: {},
    results: {}
  });
});

app.get('/edit', (req, res) => {
  var errors = {};
  let sql = "SELECT * FROM details where id = ?";
  connection.query(sql, req.query.id, (err, results) => {
    console.log(results);
    if (err) throw err;
    res.render('edit', {
      errors: errors,
     results: results[0]
    });
  });
});

//route for insert data
app.post('/add', upload.single('image'), (req, res) => {
  let data = {name: req.body.name, email: req.body.email, password: req.body.password, mobile: req.body.mobile, image: req.file.filename};
  //data.image = req.file.filename;
  console.log("dadsa",data);
  let sql = "INSERT INTO details SET ?";
  connection.query(sql, data, (err, results) => {
    if (err) throw err;
    res.redirect('/');
  });
})


//route for update data
app.post('/edit', upload.single('image'), (req, res) => {

  let data = {
    id: req.body.id,
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    mobile: req.body.mobile,
    image: req.body.image,
  };
  const {name, email, password, mobile, image, id} = data;
  let sql = "UPDATE details SET name = ?, email = ?, password = ?, mobile = ?, image = ? WHERE id = ?";
  //let sql = "UPDATE details SET ? WHERE student_id = ?";
  connection.query(sql, [name,email,password,mobile,image,id], (err, results) => {
    console.log("update result", results);
    if (err) throw err;
    res.redirect('/');

  });
})

//route for delete data
app.get('/delete', (req, res) => {
  let sql = "DELETE FROM details WHERE id = ?";
  let query = connection.query(sql, req.query.id, (err, results) => {
    if (err) throw err;
    res.redirect('/');
  });
});
module.exports = app;
