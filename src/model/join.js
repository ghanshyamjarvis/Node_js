const connection = require('../db');
const {members,movies} = require('./schemaName');

module.exports = {

  innerJoinTbl: function () {
    return new Promise((resolve) => {
      const sql = `SELECT m.firstname, m.lastname, mo.title FROM ${members} m join ${movies} mo on mo.movie_id = m.movie_id`;
      connection.query(sql, (error, data) => {
        resolve((error) ? [] : (data == null) ? [] : data);
      })
    })
  },

  leftJoinTbl: function () {
    return new Promise((resolve) => {
      const sql = `SELECT m.id_members, m.firstname, m.lastname, mo.title, mo.category FROM ${members} m join ${movies} mo on mo.movie_id = m.movie_id where mo.category = 'animation'`;
      connection.query(sql, (error, data) => {
        resolve((error) ? [] : (data == null) ? [] : data)
      })
    })
  },

  rightJoinTbl: function () {
    return new Promise((resolve) => {
      const sql = `SELECT m.id_members, m.firstname, m.lastname, mo.title, mo.category FROM ${members} m 
                   right join ${movies} mo on mo.movie_id = m.movie_id`;
      connection.query(sql, (err, data) => {
        resolve((err) ? [] : (data == null) ? [] : data)
      })
    })
  },
  crossJoinTble: function (page) {
    const limit = 5;
    page = page * limit;
    console.log("page",page);
    return new Promise((resolve) => {
      const sql = `select m.firstname, mo.title  from ${members} m cross join ${movies} mo LIMIT ${limit} OFFSET ${page}`;
      connection.query(sql, (err, data) => {
        console.log("data model",data)
        resolve((err) ? [] : (data == null) ? [] : data)
      })
    })
  }


}
