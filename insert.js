/*



//https://www.youtube.com/watch?v=XuLRKMqozwA

var express = require("express");
var mysql =require("mysql");

var connection =mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"password",
  database:"articles"
});
connection.connect();

//creating javscript object

var articles ={
 author: "ramesh",
  title:"Node Tutorial",
  body:"sfmff"
};

connection.query('insert into articles set ?',articles,function (err,result) {
   if(err){
     console.error(err);
   }else {
     console.error(result);
   }

});*/


var mysql = require("mysql");

var connection =mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"password",
  database:"details"
});
connection.connect()

var stu_det={
  name:"ram",
  class: "stream",
  dept:"commers"
}

connection.query('insert into student set ?',stu_det,function (err,result) {
  if (err){
    console.error(err)
  } else {
    console.error(result)
  }
})
