const express = require('express');
const router = express.Router();

const Appaction = require("../action/app_action");

router.get('/',Appaction.main);


module.exports = router;