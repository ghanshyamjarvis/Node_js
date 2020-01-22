const connection = require ('../models/db');
const UserModel = require('../models/app_model');

module.exports={
  //Get All Record  from state table by country_id
  state: function (req, res) {
    UserModel.recordState(req.params.countryId).then(async (data) => {
      res.json({status: true, data: data})
    })
  },
//Get All Record  from country table
  country: function (req, res) {
    UserModel.recordCountry().then(async (data) => {
      res.json({status: true, data: data, message: "shows all record country"})
    })
  },
//Get all Record  from cities table by state_id
  cities: function (req, res) {
    UserModel.recordCities(req.params.stateId).then(async (data) => {
      res.json({status: true, data: data, message: "shows all record cities"})
    })
  },
//EJS route
  index: function (req, res) {
    res.render('index',{
      title:'Express Ajax Display Dorpdown'
    });
  },
}
