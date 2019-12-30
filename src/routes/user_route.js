
const express =require('express');
const router = express.Router();
const UserAction = require('../actions/user_action');

router.post ('/createdb', UserAction.createDB);
router.post ('/createtbl',UserAction.createTable);
router.post ('/insertdata',UserAction.insertData); //add data using postman
router.post ('/checkrecord',UserAction.checkrecordtbl);//to check all record from table
router.get('/singledata/:id',UserAction.singledatafetch);//to fetch single data from record by id
router.put ('/updatederecord/:id',UserAction.updaterecord);
router.delete('/deleterecord/:id',UserAction.delete); //delete selected record from id

router.post('/createtbl_dept',UserAction.dept_tbl);
router.post('/insert_dept_data',UserAction.dept_insert_data);

router.post('/joindata',UserAction.join_data);
router.post('/leftjoin',UserAction.left_join);
router.post('/rightjoin',UserAction.rg_join);
router.post('/cross_join',UserAction.cross_join)

module.exports = router;

