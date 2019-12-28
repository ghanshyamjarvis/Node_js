const mysql = require("mysql");
const connection = require('../models/db');



module.exports = {

  createDatabase: function () {
    return new Promise((resolve) => {
      const sql = 'CREATE DATABASE Emp_details';
      connection.query(sql, (error, data) => {
        console.log("ssss",data);
        resolve((error) ? false : data);
      })
    })
  },

  create: function () {
    return new Promise((resolve) => {
      const sql = 'CREATE TABLE emp(Emp_id int AUTO_INCREMENT, Emp_name VARCHAR(255), Emp_city VARCHAR(255),PRIMARY KEY (Emp_id))';
      connection.query(sql, (error, data) => {
        resolve((error) ? false : data);
      })
    })
  },

  insertData: function (Data) {
    return new Promise((resolve) => {
      let sql = 'INSERT INTO emp(Emp_id,Emp_name,Emp_city) VALUES(?,?,?)';
      connection.query(sql, [Data.Emp_id, Data.Emp_name, Data.Emp_city], (error, data) => {
        console.log('data', data);
        console.log('error', error);
        resolve((error) ? false : data);
      })
    })
  },




}
