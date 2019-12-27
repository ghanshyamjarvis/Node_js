  const express = require('express');
  const router = express.Router();
  const UserAction = require('../actions/UserAction');


  router.post('/createdb',UserAction.createdb);

  router.post('/createtable_user',UserAction.createtable_user);

  router.post('/createtable_products',UserAction.createtable_products);

  router.get('/select_user',UserAction.getData);

  router.post('/insert_users_data',UserAction.insert_users_data);








// router.post('/createdb', UserAction.createDB);
//
// router.get('/getData',UserAction.getData)
//
// router.post('/createTable',UserAction.createTable)
//
// router.post('/insert',UserAction.insert)
//
// router.get('/getById/:id',UserAction.getById)
//
// router.delete('/delete/:id',UserAction.delete)
//
// router.put('/update/:id',UserAction.update)
//
// router.post('/insertRecord',UserAction.insertOneRecord)
//
 module.exports = router;
