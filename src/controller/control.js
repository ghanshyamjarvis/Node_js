const express =require ("express");
const router = express.Router();

const Action =require("../action/app_action");
router.get("/",Action.main.ejs)

module.exports= router;