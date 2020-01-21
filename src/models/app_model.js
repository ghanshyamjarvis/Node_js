const mysql = require("mysql");
const connection = require('../models/db');

module.exports={

  checkrecordstate: function (country_id) {
    return new Promise((resolve) => {
      const sql = 'select * from tbl_states where country_id = ?';
      connection.query(sql, [country_id], (error, data) => {
        resolve((error) ? [] : (data == null) ? [] : data);
      })
    })
  },

  checkrecordcountry: function () {
    return new Promise((resolve) => {
      const sql = 'select * from tbl_countries';
      connection.query(sql, (error, data) => {
        resolve((error) ? [] : (data == null) ? [] : data);
      })
    })
  },

  checkrecordcities: function (state_id) {
    return new Promise((resolve) => {
      const sql = 'select * from tbl_cities where state_id = ?';
      connection.query(sql, [state_id],(error, data) => {
        resolve((error) ? [] : (data == null) ? [] : data);
      })
    })
  },
}