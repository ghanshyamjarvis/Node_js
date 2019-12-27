const mysql = require('mysql');
const db = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'password',
  database:'company'

});

//connection
db.connect((err)=>{
  if (err){
    throw err;
  }
  console.log('Connected')
});

const express =require('express');
const app = express();

app.listen(3000,()=> console.log('Port connected at 3000'))

//Create Databases
app.get('/createdb',(req,res) =>{
  const sql ='create database company';
  db.query(sql,(err,result) => {
    if (err) throw err;
    console.log(result);
    res.send("company database created");
  })
});

//Create user table
app.get('/users',(req,res) =>{
  const sql ='CREATE TABLE  users(id int AUTO_INCREMENT, name VARCHAR(255), favorite_product VARCHAR(255), PRIMARY KEY (id))';
  db.query(sql,(err,result) => {
    if (err) throw err;
    console.log(result);
    res.send("users table created");
  })
});
//Create products table
app.get('/products',(req,res) =>{
  const sql ='CREATE TABLE  products(id int AUTO_INCREMENT, name VARCHAR(255), PRIMARY KEY (id))';
  db.query(sql,(err,result) => {
    if (err) throw err;
    console.log(result);
    res.send("users table created");
  })
});

// Insert Data into user table using Array
app.get('/user_tb_data',(req,res) => {
  const record = [[71, 'John', 154],
    [81,'shyam',155],
    [91,'Raj',156],
    [101,'Ramesh',157],
    [111,'Sita',158]];
  const sql = 'insert into users(id,name,favorite_product) values ?';
  db.query(sql,[record],function (err, result) {
    if (err) throw err;
    console.log(result);
    res.send("users table Insert data ");
  });
});



//Insert Data into product table
app.get('/product_rec',(req,res) => {
  const record =[[1541,'Chocolate Heaven'],
    [ 115,'Tasty Lemons' ],
    [ 1156, 'Vanilla Dreams']
  ];
  const sql = 'insert into products (id,name) values ?';
  db.query(sql,[record],function (err,result) {
    if (err) throw err;
    console.log(result)
    res.send("insert data into product table")
  });
});

// join table
app.get('/joinnn',(req,res) => {
  const sql = "SELECT users.name, products.name FROM users JOIN products ON users.favorite_product = products.id";
  db.query(sql,function (err,result) {
    if (err){
      throw err;
    }
    console.log(result)
    res.send("Simple Join data where id match in both tables")
  })
});

//update data into user table
app.get('/upt_usr_tbl_data/:id',(req,res)=>{
  const updt_data = "000";
  const sql = `update users SET '${updt_data}' where id = ${req.params.id}`;
  db.query(sql,function (err,result) {
    if (err)throw err;
    console.log(result);
    res.send("id value set to null")
  });
});

//Left Join
app.get("/left_join",(req,res)=>{
  const sql ='select users.name,products.name from users LEFT JOIN products ON users.favorite_product = products.id';
  db.query(sql,function (err,result) {
    if (err) throw err;
    console.log(result)
    res.send("Left Join of two tables shows all data of id column that also don't match");
  });
});

//Right Join
app.get("/Right_join",(req,res)=>{
  const sql ='SELECT users.name,\n' +
    'products.name\n' +
    'FROM users\n' +
    'RIGHT JOIN products ON users.favorite_product = products.id';
  db.query(sql,function (err,result) {
    if (err)throw err;
    console.log(result);
    res.send("Right Join")
  })
});

// Shows User Table Data
app.get("/select_user",(req,res)=>{
  const sql ='select * from users';
  db.query(sql,function (err,result) {
    if (err)throw err;
    console.log(result);
    res.send(result)
  })
});








