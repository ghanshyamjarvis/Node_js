const connection = require ('../models/db');
const UserModel = require('../models/app_model');

module.exports={
    db_create: async function (req,res) {
    UserModel.db_create_Emp().then(async()=>{
      res.json({status:true, message:'Database Emp Created'})
    })
  },

  createtable:function (req,res) {
    UserModel.emp_tbl_creation().then(async (table_created)=>{
      res.json({status:true,data:table_created,message:"emp_tbl Created Successfully"})
    })
  },


  //insert Data to emp table
  insert: function (req, res) {
    UserModel.find_email(req.body.Emp_Email).then((findMailRes) => {
      if (Object.keys(findMailRes).length > 0) {
        res.json({status: false, message: 'Email already used!'});
      } else {
        const {Emp_id, Emp_name, Emp_city, Emp_Email, Emp_password} = req.body;
        const data = {Emp_id, Emp_name, Emp_city, Emp_Email, Emp_password}
        UserModel.insert_data_emp(data).then(async (dataRes) => {
          (Object.keys(data).length)
            ? res.json({status: true, message: 'Insert record successfully...', data: dataRes})
            : res.json({status: false, message: 'No user details found.'});

        })
      }
    })
      .catch(()=>{
        res.json({status:false,message:"fail"})
      })
  },

  addfield: function (req,res) {
    UserModel.add_date_field().then(async (add_fields)=>{
      res.json({status:true, data:add_fields, message:"add column"})
    })
  },

  userLogin: async function (req,res){
    const {Emp_Email, Emp_password} = req.body;
    UserModel.findByCredential(Emp_Email, Emp_password).then((finRes)=>{
      if (Object.keys(finRes).length > 0){
        res.json({status:true, message:'Login successfully'});
      } else {
        res.json({status:false, message:"Login Invalid",data:finRes})

      }
    })
  },
  //Delete record
  delete: function (req, res) {
    UserModel.deletection(req.params['id']).then(async (delete_record) => {
      if (Object.keys(delete_record).length > 0) {
        res.json({status: true, message:" Deleted successfully"});
      } else {
        res.json({
          status: false, message: 'Delete record fail!'
        });
      }
    });
  },


}