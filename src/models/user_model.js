const mysql = require("mysql");
const connection = require('../models/db');
const sha1 = require('sha1');
const moment = require ('moment');


module.exports = {
  createDatabase: function () {
    return new Promise((resolve) => {
      const sql = "create database Employee";
      connection.query(sql, (err, data) => {
        resolve((err) ? false : data)
      })
    })
  },
  createTable: function () {
    return new Promise((resolve) => {
      const sql = `CREATE TABLE user(user_id int AUTO_INCREMENT, full_name VARCHAR(255), password VARCHAR(255), email VARCHAR(255), phone_number int(10), PRIMARY KEY (user_id))`;
      connection.query(sql, (err, data) => {
        resolve((err) ? false : data);
      })
    })
  },
  insert_data: function (data) {
    data['Created_At'] = moment().format('yyyy-mm-dd hh:mm:ss');
    data['Update_At'] = moment().format('yyyy-mm-dd hh:mm:ss');
    data['password'] = sha1(data['password']);
    return new Promise((resolve) => {
      const sql = `INSERT INTO user(user_id, full_name, password, email, phone_number, Created_At, Update_At) VALUES (?,?,?,?,?,?,?)`;
      connection.query(sql, [data.user_id, data.full_name, data.password, data.email, data.phone_number, data.Created_At, data.Update_At], (err, data) => {
        //console.log("data from insert_data_model", err);
        resolve((err) ? [] : (data == null) ? [] : data);
      })
    })
  },
  checkrecord: function () {
    return new Promise((resolve) => {
      const sql = 'select * from user';
      connection.query(sql, (error, data) => {
        resolve((error) ? [] : (data == null) ? [] : data);
      })
    })
  },

  getById: function (id) {
    return new Promise((resolve) => {
      const sql = 'SELECT * FROM user WHERE user_id = ?';
      connection.query(sql, [id], (error, data) => {
        resolve((error) ? {} : (data == null) ? {} : data);
      })
    })
  },

  updater: function (id, data) {
    return new Promise((resolve) => {
      this.getById(id).then(async (userData) => {
        if (Object.keys(userData).length > 0) {
          Object.keys(data).map(userKey => {
            userData[userKey] = data[userKey];
          });
          connection.query('UPDATE user SET full_name = ? , email = ?  WHERE user_id = ?',
            [data.full_name, data.email, data.id], (error, data) => {
              resolve((error) ? false : data);
            })
        } else {
          resolve(false);
        }
      });
    });
  },

  delete: function (id) {
    return new Promise((resolve) => {
      const sql = 'DELETE FROM user WHERE user_id = ?';
      connection.query(sql, [id], (error, data) => {
        resolve((error) ? {} : (data == null) ? {} : data)
      })
    })
  },

  add_date_field: function () {
    return new Promise((resolve) => {
      const sql = "ALTER TABLE user ADD COLUMN Created_At DATETIME, ADD COLUMN Update_At DATETIME "
      connection.query(sql, (error, data) => {
        resolve((error) ? false : data)
      })
    })
  },

  findByCredential: function (email, password) {
    return new Promise((resolve) => {
      let sql = `SELECT * FROM user WHERE (email = ? AND password = ?)`;
      connection.query(sql, [email, sha1(password)], (error, data) => {
        resolve((error) ? {} : (data == null) ? {} : data);
      })
    })
  },

  find_email: function (email) {
    return new Promise((resolve) => {
      const sql = 'select * from user where email = ?';
      connection.query(sql, [email], (error, data) => {
        resolve((error) ? false : data)
      })
    })
  },

}