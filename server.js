const app = require('./src/app');
const port = process.env.PORT || 5000;

const server = app.listen(port,function () {
  console.log("using",port);
})