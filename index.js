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
app.get('/user_tb_data',() => {
  const record = [[7, 'John', 154],
                [8,'shyam',155],
                [9,'Raj',156],
                [10,'Ramesh',157],
                [11,'Sita',158]];
    const sql = 'insert into users(id,name,favorite_product) values ?';
    db.query(sql,[record],function (err, result) {
      if (err) throw err;
      console.log(result)
});



//Insert Data into product table
    app.get('/product_rec',()=>{
    const record =[[154,'Chocolate Heaven'],
                    [ 155,'Tasty Lemons' ],
                    [ 156, 'Vanilla Dreams']
                  ];
      const sql = 'insert into products (id,name) values ?';
      db.query(sql,[record],function (err,res) {
      if (err) throw err;
      console.log(res)
    });
  });

// join table
  app.get('/joinnn',() => {
    const sql = "SELECT users.name, products.name FROM users JOIN products ON users.favorite_product = products.id";
    db.query(sql,function (err,result) {
      if (err){
        throw err;
      }
      console.log(result)
    })
  })







});


