const mysql = require('mysql');
const config = require('../config');

const connection = mysql.createConnection({
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
 //database:''
});

connection.connect();
module.exports = connection;
