/*
const app = require('./src/app');
const port = process.env.PORT || 3000;

const server = app.listen(port, function () {
  console.log(' In Server JS...' + port)
});

server.timeout = 300000;


*/
/*const mysql = require('mysql');
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
});*/


const app =require('./src/app')
const port = process.env.PORT || 3000

const server = app.listen(port,()=> console.log('Port connected at 3000'));

server.timeout =30000