const connection = require ('../models/db');
const UserModel = require('../models/app_model');

module.exports={

  //Get All Record  from state table
  getallstate: function (req, res) {
    UserModel.checkrecordstate(req.params.country_id).then(async (data) => {
      res.json({status: true, data: data, message: "shows all record state"})
    })
  },
//Get All Record  from country table
  getallcountry: function (req, res) {
    UserModel.checkrecordcountry().then(async (data) => {
      res.json({status: true, data: data, message: "shows all record country"})
    })
  },

  getallcities: function (req, res) {
    UserModel.checkrecordcities(req.params.state_id).then(async (data) => {
      res.json({status: true, data: data, message: "shows all record cities"})
    })
  },

  index: function (req, res) {
    res.render('index',{

    });
  },

}