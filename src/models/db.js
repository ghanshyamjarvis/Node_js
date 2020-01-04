const mysql = require('mysql');
const config = require('../config');

const connection = mysql.createConnection({
  host:config.mysql.host,
  user:config.mysql.user,
  password:config.mysql.password,
  database:config.mysql.database //disable while creating database
})
connection.connect();
console.log("Connection Done")

module.exports = connection;