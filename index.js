//https://www.youtube.com/watch?v=EN6Dx22cPRI&t=829s

const mysql = require('mysql');
const express = require('express');


//create connection
const db = mysql.createConnection({
  host: 'localhost',
  user:'root',
  password: 'password',
  database: 'nodemysql'
});

//Connect
db.connect((err)=>{
    if (err){
      throw err;
      }
    console.log('MySql Connected');
});

const app = express();

//Create Database
app.get('/createdb', ( req, res) => {
  let sql ='CREATE DATABASE nodemysql';
  db.query(sql,(err,result)=>{
    if (err) throw err;
    console.log(result);
    res.send('database creadted');
  })
});

//create table
app.get('/createpoststable', (req,res) => {
  const sql = 'CREATE TABLE  posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY (id))';
  db.query(sql,(err,result)=>{
    if (err) throw err;
    console.log(result);
    res.send('Table Created posts');
  })
});

// Insert Post 1
app.get('/addpost1',(req,res) => {
  const post ={title:'Post Two', body:'This is post number tow '};
  const sql = 'insert into posts set ?';
  const query =db.query(sql,post,(err,result) => {
    if (err) throw err;
    console.log(result);
    res.send('post 1 added...');
  })
});

// Select Posts
app.get('/getposts',(req,res) => {
  const sql = 'select * from posts';
  const query =db.query(sql,(err,result) => {
    if (err) throw err;
    console.log(result);
    res.send('Data Fetch') ;
  })
});

// Select single data
app.get('/getposts/:id',(req,res) => {
  const sql = `select * from posts where id = ${req.params.id}`;
  const query = db.query(sql,(err,results) => {
    if (err) throw err;
    console.log(results);
    res.send('Data single') ;
  })
});

// Update data
  app.get('/updateposts/:id',(req,res) => {
  const newTitle = 'Updated Title';
  const sql = `update posts SET title = '${newTitle}' where id = ${req.params.id}`;
  const query = db.query(sql,(err,results) => {
    if (err) throw err;
    console.log(results);
    res.send('Data Updated') ;
  })
});

// Delete data
app.get('/deleteposts/:id',(req,res) => {
  const newTitle = 'Updated Title';
  const sql = `delete from posts where id = ${req.params.id}`;
  const query = db.query(sql,(err,results) => {
    if (err) throw err;
    console.log(results);
    res.send('Data deleted') ;
  })
});


app.listen(3000, ()=>{
  console.log('server start on 3000 port')
});



/*
const bodyparser = require('body-parser');

app.use(bodyparser.json());

var mysqlConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'EmployeeDB',
  //multipleStatements: true
});

mysqlConnection.connect((err) => {
  if (!err)
    console.log('DB connection succeded.');
  else
    console.log('DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
});

app.listen(3000, () => console.log('Express server is runnig at port no : 3000'));


//Get all employee
app.get('/employee', (req, res) => {
  mysqlConnection.query('SELECT * FROM employee', (err, rows, fields) => {
    if (!err)
      res.send(rows);
    else
      console.log(err);
  })
});

//Get an employee
app.get('/employee/:id', (req, res) => {
  mysqlConnection.query('SELECT * FROM employee WHERE EmpID = ?',
    [req.params.id], (err, rows, fields) => {
    if (!err)
      res.send(rows);
    else
      console.log(err);
  })
});

//Delete an employees
app.delete('/employee/:id', (req, res) => {
  mysqlConnection.query('DELETE FROM employee WHERE EmpID = ?', [req.params.id], (err, rows, fields) => {
    if (!err)
      res.send('Deleted successfully.');
    else
      console.log(err);
  })
});
/!*

//Insert an employees
app.post('/employee', (req, res) => {
  let emp = req.body;
  var sql = "SET @EmpID = ?;SET @Name = ?;SET @EmpCode = ?;SET @Salary = ?; \
    CALL EmployeeAddOrEdit(@EmpID,@Name,@EmpCode,@Salary);";
  mysqlConnection.query(sql, [emp.EmpID, emp.Name, emp.EmpCode, emp.Salary], (err, rows, fields) => {
    if (!err)
      rows.forEach(element => {
        if(element.constructor == Array)
          res.send('Inserted employee id : '+element[0].EmpID);
      });
    else
      console.log(err);
  })
});
*!/



/!*

//Update an employees
app.put('/employees', (req, res) => {
  let emp = req.body;
  var sql = "SET @EmpID = ?;SET @Name = ?;SET @EmpCode = ?;SET @Salary = ?; \
    CALL EmployeeAddOrEdit(@EmpID,@Name,@EmpCode,@Salary);";
  mysqlConnection.query(sql, [emp.EmpID, emp.Name, emp.EmpCode, emp.Salary], (err, rows, fields) => {
    if (!err)
      res.send('Updated successfully');
    else
      console.log(err);
  })
});
*!/
*/
