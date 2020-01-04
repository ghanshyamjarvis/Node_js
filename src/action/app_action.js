const connection = require ('../models/db');
const UserModel = require('../models/user_model');
const jwt = require('jsonwebtoken');
const config =require('../config');

module.exports= {
  //Create DATABASE
  createDB: async function (req, res) {
    UserModel.createDatabase().then(async () => {
      res.json({state: true, message: "Database Employee Created"})
    })
  },
  //Create Table User
  createTbl: async function (req, res) {
    UserModel.createTable().then(async () => {
      res.json({state: true, message: "user Table Created"})
    })
  },

  //Insert Data to Table
  insert: function (req, res) {
    UserModel.find_email(req.body.email).then((findRes) => {
      if (Object.keys(findRes).length > 0){
        res.json({status:false, message:"Email Already Exits"})
      }else {
        const {user_id, full_name, password, email, phone_number} = req.body;
        const data = {user_id, full_name, password, email, phone_number};
        UserModel.insert_data(data).then(async (resData) => {
          (Object.keys(resData).length > 0)
            ? res.json({state: true, message: "Insert record successfully..."})
            : res.json({state: false, message: "Data Already Exits"})
        })
      }
    })
  },

  //Get All Record  from table
  getAll: function (req, res) {
    UserModel.checkrecord().then(async (data) => {
      res.json({status: true, data: data, message: "shows all record"})
    })
  },

  //get record by id
  getById: function (req, res) {
    UserModel.getById(req.params.id).then(async (resData) => {
      (Object.keys(resData).length > 0)
        ? res.json({status: true, Data: resData, message: "select by id form table user"})
        : res.json({status: false, message: "fail to fetch record"})
    })
  },

  // update record By Id
  updateById: function (req, res) {
    const {full_name, email} = req.body;
    const data = {full_name, email};
    UserModel.updater(req.params.id, data).then(async (update_data) => {
      if (Object.keys(update_data).length > 0) {
        res.json({status: true, data: update_data, message: 'record successfully Updated'})
      } else {
        res.json({status: true, message: "Fail to update record"})
      }
    })
  },

  //Delete Record BY id
  deleteById: function (req, res) {
    UserModel.delete(req.params.id).then(async (delete_record) => {
      if (Object.keys(delete_record).length > 0) {
        res.json({status: true, data: delete_record});
      } else {
        res.json({status: false, message: 'fail to delete record'})
      }
    })
  },

  //column added Created_At and Update_At
  addcolumn: function (req, res) {
    UserModel.add_date_field().then(async (add_fields) => {
      res.json({status: true, data: add_fields, message: "add column"})
    })
  },

  //Login
  userLogin: async function (req, res) {
    const {email, password} = req.body;
    UserModel.findByCredential(email, password).then(async (finRes) => {
     // console.log("find ersponce", finRes)
      if (Object.keys(finRes).length > 0) {
        jwt.sign({finRes}, config.secretKey, (error, token) => {
          finRes[0]['token'] = token; //token field add here
          console.log("tokennnn",token);
          res.json({status: true, message: 'Key Generate', data: finRes});
        })
      } else {
        res.json({status: false, message: 'Key Not Generate!'});
      }
    });
  },

}
