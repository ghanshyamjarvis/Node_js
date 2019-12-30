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

  checkrecordtbl:function (req,res) {
    UserModel.checkrecord().then(async (showdata)=>{
      res.json({status:true,data:showdata,message:'select record from table emp'})
    })
  },
  //Get records by ID
  singledatafetch: function (req, res) {
    UserModel.fetchdata(req.params.id).then(async (userRes) => {
      (Object.keys(userRes).length)
        ? res.json({status: true, data: userRes})
        : res.json({status: false, message: 'No user details found.'});
    })
  },


  //update record by ID
  updaterecord:function (req,res) {
    const {Emp_name,Emp_city} =req.body;
    const userData ={Emp_name,Emp_city};
    
    UserModel.updater(req.params['id'],userData).then(async (updata) =>{
      if (Object.keys(updata).length > 0){
        res.json({
          status:true,
          data:updata,
          message:'Updated record successfully'
        });
      }else {
        res.json({
            status:false,message:'Update Fail'
        })
      }
    })
  },

  //Delete record
  delete: function (req, res) {
    UserModel.delete(req.params['id']).then(async (delete_rd) => {
      if (Object.keys(delete_rd).length > 0) {
        res.json({status: true, data: delete_rd});
      } else {
        res.json({
          status: false, message: 'Deleting Dealer failed!'
        });
      }
    });
  },


  //Create an table emp
  dept_tbl : function (req, res) {
    UserModel.create_dept_tbl().then(async (create_table) => {
      res.json({status: true, data: create_table, message: 'Table Created successfully...'});
    })
  },

  //Insert Data into Dept Table
  dept_insert_data:function (req, res) {
    const {dept_id, dept_name} = req.body;
    const Data = {
      dept_id,
      dept_name
    }
    UserModel.dept_insert_data(Data).then(async (userdata) => {
      (Object.keys(userdata).length)
        ? res.json({status: true, message: 'Insert record successfully...', data: userdata})
        : res.json({status: false, message: 'No user details found.'});

    })
  },
  join_data:function (req,res) {
    UserModel.join_table().then(async (data)=>{
      res.json({status:true, data:data, message:'join successfully'})
    })
  },

  left_join:function (req,res) {
    UserModel.left_join().then(async (data)=>{
      res.json({status:true, data:data, message:"Left Join Done"})
    })
  },
  rg_join:function (req,res) {
    UserModel.right_join().then(async (data)=>{
      res.json({status:true, data:data, message:"Right Join Done"})
    })
  },
  cross_join:function (req,res) {
    UserModel.cross_join().then(async (data)=>{
      res.json({status:true, data:data, message:"Cross Join"})
    })
  }

}