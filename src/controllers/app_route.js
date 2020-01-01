
const express =require('express');
const router = express.Router();
const UserAction = require('../action/app_action');


router.post('/db_creation', UserAction.db_create);
router.post('/tbl_creation',UserAction.createtable);
router.post('/insert_data',UserAction.insert);
router.post('/add_field',UserAction.addfield);
router.post('/usr_login',UserAction.userLogin);
router.post('/delete_record/:id',UserAction.delete);



module.exports = router;
