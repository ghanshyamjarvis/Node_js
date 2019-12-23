const express = require('express');
const router= express.Router();
const path =require('path')
const app =express();
const engine =require('ejs-locals')

// set the view engine to ejs
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

router.use('/', require('./controller/control'));
app.use('/', router);

module.exports = app;