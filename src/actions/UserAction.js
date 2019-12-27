const UsersModal = require('../model/user');

module.exports = {
  //created company database
  createdb: async function (req, res) {
    UsersModal.createdb().then(async ()=>{
      res.json({message:'company Database Created'})
    });
  },
  //show user table data
  getData: async function (req, res) {
    UsersModal.getData().then(async (result) => {
      res.json({data:result, message:'data from user table'})
    })
  },
  //create users table
  createtable_user:async function(req,res){
    UsersModal.createtable_user().then(async (result)=>{
      res.json({message:'User table Created'})
    })
  },
  //create products table
  createtable_products:async function (req,res){
    UsersModal.createtable_products().then(async (result)=>{
      res.json({message:'Products table Created'})
    })
  },

  insert_users_data:async  function (req,res){
    UsersModal.insert_users_data().then(async (result)=>{
      res.json({data:result})
    })
  }

}

