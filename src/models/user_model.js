const mysql = require("mysql");
const connection = require('../models/db');



module.exports = {

  createDatabase: function () {
    return new Promise((resolve) => {
      const sql = 'CREATE DATABASE Emp_details';
      connection.query(sql, (error, data) => {
        //console.log("ssss",data);
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

  checkrecord:function () {
    return new Promise((resolve )=>{
      const sql = 'select * from emp';
      connection.query(sql,(error,data)=>{
        resolve((error) ? [] : (data == null) ? [] : data);
      })
    })
  },

  fetchdata: function (id) {
    return new Promise((resolve) => {
      let sql = 'SELECT * FROM emp WHERE Emp_id = ?';
      connection.query(sql, [id], (error, data) => {
        resolve((error) ? {} : (data == null) ? {} : data);
      })
    })
  },

  updater: function (id, data) {
    return new Promise((resolve) => {
      this.fetchdata(id).then(async (userData) => {
        if (Object.keys(userData).length > 0) {

          Object.keys(data).map(userKey => {
            userData[userKey] = data[userKey];
          });
          connection.query('UPDATE emp SET Emp_name =? , Emp_city = ?  WHERE Emp_id = ?',
            [data.Emp_name, data.Emp_city, id], (error, data) => {
              resolve((error) ? false : data);
            })
        } else {
          resolve(false);
        }
      });
    });
  },
  delete:function (id) {
    return new Promise((resolve )=>{
      const sql ='DELETE FROM emp WHERE Emp_id = ?';
      connection.query(sql,[id],(error,data)=>{
        resolve((error) ? {}:(data==null) ? {} : data)
      })
    })
  },

  create_dept_tbl: function () {
    return new Promise((resolve) => {
      const sql = 'CREATE TABLE dept(dept_id int AUTO_INCREMENT, dept_name VARCHAR(255), PRIMARY KEY (dept_id))';
      connection.query(sql, (error, data) => {
        resolve((error) ? false : data);
      })
    })
  },

  dept_insert_data: function (Data) {
    return new Promise((resolve) => {
      let sql = 'INSERT INTO dept(dept_id,dept_name) VALUES(?,?)';
      connection.query(sql, [Data.dept_id, Data.dept_name], (error, data) => {
        console.log('data', data);
        console.log('error', error);
        resolve((error) ? false : data);
      })
    })
  },

  join_table:function () {
    return new Promise((resolve )=>{
      const sql = 'select emp.Emp_id,emp.Emp_name,dept.dept_id,dept.dept_name from emp join dept on dept_id = Emp_id;';
      connection.query(sql,(error,data)=>{
        resolve((error) ? false:data);
      })
    })
  },
  left_join:function () {
    return new Promise((resolve )=>{
      const sql = 'select emp.Emp_id,emp.Emp_name,dept.dept_id,dept.dept_name from emp left join dept on dept_id = Emp_id;';
      connection.query(sql,(error,data)=>{
        resolve((error) ? false : data);
      })
    })
  },

  right_join:function () {
    return new Promise((resolve )=>{
      const sql ='select emp.Emp_id,emp.Emp_name,dept.dept_id,dept.dept_name from emp right join dept on dept_id = Emp_id';
      connection.query(sql,(error,data)=>{
        resolve((error) ? false: data)
      })
    })
  },
  cross_join:function () {
    return new Promise((resolve )=>{
      const sql = 'select emp.Emp_id,emp.Emp_name,dept.dept_name from emp cross join dept';
      connection.query(sql,(error,data)=>{
        resolve(((error) ? false:data))
      })
    })
  }
}
