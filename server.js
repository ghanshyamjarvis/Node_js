const app = require('./src/app');
const port  = process.env.PORT || 4000;

const server = app.listen(port,function () {
  console.log("Connect To Port" + port);
});
server.timeout =30000;