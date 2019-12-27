const connection = require('../db')

module.exports = {

  getData: function () {
    return new Promise((resolve) => {
      const sql = 'select * from users';
      connection.query(sql, (error, data) => {
        resolve((error) ? [] : (data == null) ? [] : data);
      })
    })
  },

  createdb: function () {
    return new Promise((resolve) => {
      const sql = 'create database company';
      connection.query(sql, (error, data) => {
        resolve((error) ? [] : (data == null) ? [] : data)
      })
    })
  },

  createtable_user: function () {
    return new Promise((resolve) => {
      const sql = 'CREATE TABLE  users(id int AUTO_INCREMENT, name VARCHAR(255), favorite_product VARCHAR(255), PRIMARY KEY (id))';
      connection.query(sql, (error, data) => {
        resolve((error) ? [] : (data == null) ? [] : data)
      })
    })
  },

  createtable_products: function () {
    return new Promise((resolve) => {
      const sql = "CREATE TABLE  products(id int AUTO_INCREMENT, name VARCHAR(255), PRIMARY KEY (id))"
      connection.query(sql, (error, data) => {
        resolve((error) ? [] : (data == null) ? [] : data)
      })
    })
  },

  insert_users_data: function () {
    const record = [[171, 'John', 154],
      [1181, 'shyam', 155],
      [1191, 'Raj', 156],
      [11101, 'Ramesh', 157],
      [11111, 'Sita', 158]];
    return new Promise((resolve) => {
      const sql = 'insert into users(id,name,favorite_product) values ?';
      connection.query(sql, [record], function (error, data) {
        resolve((error) ? [] : (data == null) ? [] : data)
      })
    })
  },


}

