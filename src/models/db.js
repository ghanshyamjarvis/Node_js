const mysql = require('mysql');
//const config = require('../config');

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
 database: "world"
});

connection.connect();
module.exports = connection;
