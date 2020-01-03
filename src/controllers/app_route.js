
const express =require('express');
const router = express.Router();
const UserAction = require('../action/app_action');
const Auth = require('../services/Auth')

router.get('/', UserAction.getAll);
router.post('/db_creation', UserAction.db_create);
router.post('/tbl_creation', UserAction.createtable);
router.post('/insert_data', UserAction.insert);
router.post('/add_field', UserAction.addfield);
router.post('/usr_login', UserAction.userLogin);
router.post('/delete_record/:id', Auth.verifyToken, UserAction.delete);

module.exports = router;
