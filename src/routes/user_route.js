
const express =require('express');
const router = express.Router();
const UserAction = require('../actions/user_action');

router.post ('/createdb', UserAction.createDB);
router.post ('/createtbl',UserAction.createTable);
router.post ('/insertdata',UserAction.insertData);






module.exports = router;
