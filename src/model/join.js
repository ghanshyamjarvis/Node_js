const connection = require('../db')


module.exports = {

  innerJoinTbl: function () {
    return new Promise((resolve) => {
      const sql = 'SELECT m.firstname, m.lastname, mo.title FROM members m\n' +
        'join movies mo on mo.movie_id = m.movie_id;';
      connection.query(sql, (error, data) => {
        resolve((error) ? [] : (data == null) ? [] : data);
      })
    })
  },

}
