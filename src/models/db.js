const mysql = require('mysql');

const connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"password",
    database:"Emp_details" //disable when create database
})
connection.connect();
console.log("Connection Done")

module.exports = connection;