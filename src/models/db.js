const mysql = require('mysql');

const connection = mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"password",
  database:"studentForm" //disable while creating database
});
connection.connect();
console.log("Connection Done")

module.exports = connection;