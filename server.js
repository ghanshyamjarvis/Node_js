const app = require('./src/app');
const port = process.env.PORT || 3001;

const  server = app.listen(port,function () {
  console.log("Connected At " + port);
});

server.timeout = 30000;
