const connection = require ('../models/db');
const UserModel = require('../models/user_model');

module.exports={

  //Create database Emp_details
  createDB: async function (req, res) {
    UserModel.createDatabase().then(async () => {
      res.json({status: true, message: 'DataBase Created...'});
    })
  },
  //Create an table emp
  createTable : function (req, res) {
    UserModel.create().then(async (create_table) => {
      res.json({status: true, data: create_table, message: 'Table Created successfully...'});
    })
  },


  //insert Data to emp table
  insertData: function (req, res) {
    const {Emp_id, Emp_name, Emp_city} = req.body;
    const Data = {
      Emp_id,
      Emp_name,
      Emp_city
    }
    UserModel.insertData(Data).then(async (userdata) => {
      (Object.keys(userdata).length)
        ? res.json({status: true, message: 'Insert record successfully...', data: userdata})
        : res.json({status: false, message: 'No user details found.'});

    })
  },
}