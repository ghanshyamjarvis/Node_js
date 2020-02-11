const express = require("express");
const router = express.Router();
const app = express();
const connection =require("./models/db");
const imagemin = require('imagemin');
//const imageminJpegtran = require('imagemin-jpegtran');
const imageminmozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');


(async () => {
  const files = await imagemin(['src/images/*.{jpg,png}'], {
    destination: 'build/images',
    plugins: [
      imageminmozjpeg({quality: [40, 60]}),
      //imageminPngquant({quality: [0.1, 0.2]})
    ]
  });

  console.log(files);
  //=> [{data: <Buffer 89 50 4e …>, destinationPath: 'build/images/foo.jpg'}, …]
})();

module.exports = app;
