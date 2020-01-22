const express =require('express');
const router = express.Router();
const UserAction = require('../action/app_action');

router.get('/states/:countryId', UserAction.state); //state table find by country id route
router.get('/countries', UserAction.country); // Get all country table data route
router.get('/cities/:stateId', UserAction.cities);// cities table find by state_id route
router.get('/',UserAction.index); // index.ejs route
module.exports = router;
