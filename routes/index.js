var express = require('express');
var app =express();

app.get('/',function (req,res) {
  res.render('index',{title:'NODEJS CURD App'})
});

module.exports=app;