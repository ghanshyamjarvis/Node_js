const mysql = require('mysql');
// const config = require('../config');

const connection = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'password',
  // database:'' //disable while creating database
})
connection.connect();
console.log("Connection Done")

module.exports = connection;