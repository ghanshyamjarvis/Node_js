const connection = require ('../models/db');
const UserModel = require('../models/app_model');

module.exports={
    db_create: async function (req,res) {
    UserModel.db_create_Emp().then(async()=>{
      res.json({status:true, message:'Database Emp Created'})
    })
  },

  emp_tbl_creation:function (req,res) {
    UserModel.emp_tbl_creation().then(async (table_created)=>{
      res.json({status:true,data:table_created,message:"emp_tbl Created Successfully"})
    })
  },
/*

  insert_data_emp: function (req, res) {
      //console.log('req.body', req.body)
    UserModel.findByEmail(req.body.Emp_Email).then((findMailRes) => {
      if (Object.keys(findMailRes).length > 0) {
        res.json({status: false, message: 'Email already used!'});
      } else {
        const {Emp_id,Emp_name,Emp_city,Emp_Email,Emp_password} = req.body;

        //Create user
        const userData = {Emp_id,Emp_name,Emp_city,Emp_Email,Emp_password};
        UserModel.insert_data_emp(userData).then((userRes) => {
          userRes.password ='';
           res.json({
            status: true, data: userRes,
            message: 'Signup successfully.'
          })
        })
          .catch(() => {
            res.json({status: false, message: 'Sign up failed!'})
          })
      }
    })
  },
*/

 /*insert_data_emp:function (req,res) {
   UserModel.findByEmail(req.body.Emp_Email).then((find_email)=>{
     if (Object.keys(find_email).length> 0){
       res.json({ status:false,message:'Already Email Exits'});
     }
         const {Emp_id, Emp_name, Emp_city, Emp_Email, Emp_password} = req.body;
       const data = {Emp_id, Emp_name, Emp_city, Emp_Email, Emp_password}
       UserModel.insert_data_emp(data).then(async (data_inserted) => {
         (Object.keys(data_inserted).length)
           ? res.json({status: true, message: 'Insert record successfully...', data: userdata})
           : res.json({status: false, message: 'No user details found.'});

   })
 },*/

  //insert Data to emp table
  insert_data_emp: function (req, res) {
    console.log("req.body",req.body.Emp_Email);
    UserModel.find_email(req.body.Emp_Email).then((findMailRes) => {


      console.log("findMailRes",findMailRes);
      if (Object.keys(findMailRes).length > 0) {
        res.json({status: false, message: 'Email already used!'});
      } else {
        const {Emp_id, Emp_name, Emp_city, Emp_Email, Emp_password} = req.body;
        const data = {Emp_id, Emp_name, Emp_city, Emp_Email, Emp_password}
        UserModel.insert_data_emp(data).then(async (dataRes) => {
          console.log('data', dataRes);
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

  add_date_field : function (req,res) {
    UserModel.add_date_field().then(async (add_fields)=>{
      res.json({status:true, data:add_fields, message:"add column"})
    })
  },


}