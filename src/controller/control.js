const express =require ("express");
const router = express.Router();

const Action =require("../action/app_action");
router.get("/", Action.main)

module.exports= router;