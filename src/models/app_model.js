const mysql = require("mysql");
const connection = require('../models/db');

module.exports={

  recordState: function (countryId) {
    return new Promise((resolve) => {
      const sql = 'select * from tbl_states where country_id = ?';
      connection.query(sql, [countryId], (error, data) => {
        resolve((error) ? [] : (data == null) ? [] : data);
      })
    })
  },

  recordCountry: function () {
    return new Promise((resolve) => {
      const sql = 'select * from tbl_countries';
      connection.query(sql, (error, data) => {
        resolve((error) ? [] : (data == null) ? [] : data);
      })
    })
  },

  recordCities: function (stateId) {
    return new Promise((resolve) => {
      const sql = 'select * from tbl_cities where state_id = ?';
      connection.query(sql, [stateId],(error, data) => {
        resolve((error) ? [] : (data == null) ? [] : data);
      })
    })
  },
}
