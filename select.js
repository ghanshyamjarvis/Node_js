/*
//https://www.youtube.com/watch?v=XuLRKMqozwA


var mysql =require("mysql");

var connection =mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"password",
  database:"articles",
  multipleStatements:"true" // if this is true table can delete from the database
});
connection.connect();

var id ="1; drop table articles"; // to drop the table
      // connection.escape is for security reason ..person cannot delete table

var query = connection.query('select * from articles where id =' + connection.escape(id), function (err,result) {
    console.log(result);
});
*/

var mysql =require("mysql");

var connection =mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"password",
  database:"articles",
  multipleStatements:"true" // if this is true table can delete from the database
});
connection.connect();

var id ="1; drop table articles"; // to drop the table
// connection.escape is for security reason ..person cannot delete table

 connection.query('select * from articles where id =' + connection.escape(id), function (err,result) {
  console.log(result);
});
