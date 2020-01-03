const mysql = require("mysql");
const connection = require('../models/db');
const moment = require('moment');
const sha1 = require('sha1');

module.exports = {
  db_create_Emp:function () {
    return new Promise((resolve)=>{
      const sql ="CREATE DATABASE Emp";
      connection.query(sql,(error,data)=>{
        resolve((error) ? false :data)
      })
    })
  },
  emp_tbl_creation:function () {
    return new Promise((resolve )=>{
      const sql =
        `CREATE TABLE emp(Emp_id int AUTO_INCREMENT,
                      Emp_name VARCHAR(255),
                      Emp_city VARCHAR(255),
                      Emp_Email VARCHAR(255),
                      Emp_password VARCHAR(255),
                      PRIMARY KEY (Emp_id));`
        connection.query(sql,(error,data)=>{
        resolve((error) ? false : data)
      })
    })
  },

  insert_data_emp:function (data) {
     data['Created_At']= moment().format('yyyy-mm-dd hh:mm:ss');
     data['Update_At']= moment().format('yyyy-mm-dd hh:mm:ss');
     data['Emp_password'] = sha1(data['Emp_password']);
    return new Promise((resolve)=>{
      const sql =`INSERT INTO emp(Emp_id,Emp_name,Emp_city,Emp_Email,Emp_password,Created_At,Update_At) VALUES(?,?,?,?,?,?,?)`;
      connection.query(sql,[data.Emp_id,data.Emp_name,data.Emp_city,data.Emp_Email,data.Emp_password,data.Created_At,data.Update_At],(error,data)=>{
       resolve((error) ? [] : (data == null) ? [] : data)
      })
    })
  },

  add_date_field:function () {
    return new Promise((resolve )=>{
      const sql= "ALTER TABLE emp ADD COLUMN Created_At DATETIME, ADD COLUMN Update_At DATETIME "
      connection.query(sql,(error,data)=>{
        resolve((error) ? false : data)
      })
    })
  },

  find_email:function (email) {
    return new Promise((resolve )=>{
      const sql = 'select * from emp where Emp_Email = ?';
      connection.query(sql,[email],(error,data)=>{
        resolve((error) ? false : data)
      })
    })
  },

  findByCredential: function (Emp_Email, Emp_password) {
    return new Promise((resolve) => {
      let sql = `SELECT * FROM emp WHERE (Emp_Email = ? AND Emp_password = ?)`;
      connection.query(sql, [Emp_Email, sha1(Emp_password)], (error, data) => {
        resolve((error) ? {} : (data == null) ? {} : data);
      })
    })
  },
  deletection : function (id) {
    return new Promise((resolve )=>{
      const sql = 'DELETE FROM emp where Emp_id = ?';
      connection.query(sql,[id],(error,data)=>{
        resolve((error) ? {} : (data == null) ? {} : data);
      })
    })
  }
}