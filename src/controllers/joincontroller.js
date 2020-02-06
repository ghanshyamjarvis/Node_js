const express = require('express');
const router = express.Router();
const joinAction = require('../actions/joinAction');


router.get('/join-inner', joinAction.innerJoin);
router.get('/left-join', joinAction.leftJoin);
router.get('/right-join', joinAction.rightJoin);
router.get('/cross', joinAction.crossJoin);
module.exports = router;