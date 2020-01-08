const connection = require ('../models/db');
const UserModel = require('../models/user_model');
const jwt = require('jsonwebtoken');
// const config =require('../config');
const randToken = require('rand-token');
const userEmail = require('../services/email')

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
    const{email, phone_number} = req.body;
    UserModel.findByEmailOrPhone(email, phone_number).then((findRes) => {
      if (Object.keys(findRes).length > 0){
        res.json({status:false, message:"Email Or Phone Already Exits"})
      }else {
        const {user_id, full_name, password, email, phone_number} = req.body;
        const data = {user_id, full_name, password, email, phone_number, verificationCode : randToken.generate(10)};
        UserModel.insert_data(data).then(async (userRes) => {
         // console.log("veriifiy code",data.verificationCode);
          //console.log("veriifiy codeeeeeeeeee",userRes);
          //(Object.keys(resData).length > 0)
          //userRes.password = '';
          //Send Mail Verify Account
          const mailData = {
            code: data.verificationCode,
             email: data.email,
          }
         // console.log("maildata",mailData);
          userEmail.activationsMail(mailData, function (mailRes) {
            //console.log("mail respos",mailRes);
            res.json({
              status: true,
              message: 'Sign up success! Please verify your account!'
            });
          });
          //userEmail.activationsMail(req, userRes);
         //console.log("veriifiy code at user response",userRes);
          res.json({state: true, message: "Insert record successfully..."})
            //: res.json({state: false, message: "Data Already Exits"})
        })
      }
    })
      .catch(() => {
        res.json({status: false, message: 'Sign up failed!'})
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
        jwt.sign({finRes}, 'sss', (error, token) => {
          finRes[0]['token'] = token; //token field add here
          console.log("tokennnn",token);
          res.json({status: true, message: 'Key Generate', data: finRes});
        })
      } else {
        res.json({status: false, message: 'Key Not Generate!'});
      }
    });
  },
  //User_details Create Table User
  detailsTbl: async function (req, res) {
    UserModel.detailsTbl().then(async () => {
      res.json({state: true, message: "user_details Table Created"})
    })
  },
  //Insert Data to user_details table
  detailsInsert: function (req,res) {
    const {email, address, city } = req.body;
    const data = {email, address, city};
    UserModel.detailsInsert(data).then(async (userRes) => {
      (Object.keys(userRes).length)
        ? res.json({status:true, message: "data inserted successfully"})
        : res.json({status:false, message: "Fail to insert"})
    })
  },
  innerjoin:function (req,res) {
    UserModel.innerjoin().then(async (data) => {
      res.json({status:true, data:data, message:'join successfully'})
    })
  },
  leftjoin: function (req,res) {
    UserModel.leftjoin().then(async (data) => {
      res.json({status:true, data:data, message:'Left join successfully'})
    })
  },
  rightjoin: function (req,res) {
    UserModel.rightjoin().then(async (data) => {
      res.json({status:true, data:data, message: "Right Join Successfully"})
    })
  },
  crossjoin:function (req,res) {
    UserModel.crossjoin().then(async (data) => {
      res.json({status:true, data:data, message: "Right Join Successfully"})
    })
  },

  accountActivate: function (req,res) {
    const verificationCode = req.query.token;
    //const data = {verificationCode}
    //console.log("action data",data);
   // console.log("parmas",req.params);
    UserModel.findByVerifyCode(verificationCode).then(async (userResponse) => {
      //console.log("respoooooooooonse", verificationCode);
      userResponse[0]['verificationCode'] = '';
      //console.log("respoooooooooonse", userResponse);
      UserModel.updateverificationCode(userResponse[0].verificationCode, userResponse[0].user_id).then((updateRes) => {
       // console.log("update res", userResponse[0].verificationCode,userResponse[0].user_id);
        //console.log("update res", updateRes);
        //if (Object.keys(updateRes).length > 0){
            res.json({status:true, data:updateRes, message: "update"})
       // }
      })
    })
      .catch((message = "Activation Fail ") => {
        res.json({status:false, message})
      })
  }


  }
