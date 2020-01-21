const express =require('express');
const router = express.Router();
const UserAction = require('../action/app_action');


router.get('/getallstate/:country_id', UserAction.getallstate); //state table route
router.get('/getallcountry', UserAction.getallcountry);
router.get('/getallcities/:state_id', UserAction.getallcities);
router.get('/',UserAction.index)

router.get('/',function (req,res,next) {

  res.render('index',{ title: 'getallcountry'});
});

module.exports = router;