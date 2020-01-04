
const express =require('express');
const router = express.Router();
const UserAction = require('../action/app_action');
const Auth =require('../services/Auth')

router.post ('/createdb', UserAction.createDB);
router.post('/createTbl', UserAction.createTbl);
router.post('/insert', UserAction.insert);
router.get('/getAll', UserAction.getAll);
router.get('/getById/:id', UserAction.getById);
router.put('/updateById/:id', UserAction.updateById);
router.delete('/deleteById/:id', UserAction.deleteById);
router.post('/addcolumn', UserAction.addcolumn);
router.post('/userLogin', UserAction.userLogin);

module.exports = router;
