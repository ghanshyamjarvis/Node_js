
const express =require('express');
const router = express.Router();
const UserAction = require('../action/app_action');


router.post('/db_creation', UserAction.db_create);
router.post('/tbl_creation',UserAction.emp_tbl_creation);
router.post('/insert_data',UserAction.insert_data_emp);
router.post('/add_field',UserAction.add_date_field);


module.exports = router;
