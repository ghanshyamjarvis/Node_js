const app = require("./src/app");
const  port = process.env.PORT || 3000;

const server =app.listen(port,function () {
    console.log("using",3000)
});