const nodemailer = require('nodemailer');
const config = require('../config');

/*const transporter = nodemailer.createTransport({
  service: config.mail.service,
      auth: {
      //secure: config.mail.service,
      user: config.mail.username,
      password: config.mail.password
  }
})*/
const transporter = nodemailer.createTransport({
  service: 'gmail',
  //logger: true,
  //debug: true,
  auth: {
    user: 'ghanshyam.jarvis@gmail.com',
    pass: 'nzbwmwznczmdurve'
  }
});

module.exports = {

  activationsMail: function (data) {
    const link = config.webhost + 'user/active/' + data.code;
    //console.log("code", data.code);
    const mailOptions = {
      from: '"Ecommerce" <noreply@ecommerce.com>', // sender add  ress
      to: data.email,
      subject: 'Please confirm your email account',
      html: '\n\n' + 'Please Click here to verify <a href=' + link + '> Click here</a>'
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log('Email Error', error);
      } else {
        // callback(true);
        console.log('Email sent: ' + info.response);
      }
    })
  }
};