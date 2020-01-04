const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = {

  verifyToken : async function(req,res, next) {
    //Get auth header value
    let authorization = req.headers['x-access-token'] || req.headers['authorization'];
      //Check if bearer is undefined
      if(typeof authorization !== 'undefined'){
        // Split at the space
        const  bearer =authorization.split(' ');
        // Get token from array
        const bearerToken = bearer[1];
        jwt.verify(bearerToken, config.secretKey, (err, authData) => {
          if (err) {
            return res.json({
              success: false,
              message: 'Token is not valid'
            });
          } else {
            req['user'] = authData;
            // Next middleware
            next();
          }
        })
      } else {
        // Forbidden
        res.json({status: false, message:'Please verify token'})
      }
  },

  validateUser : async function(req, res, next) {
    const role = req.user.loginRes.role;
    if(role === 'admin'){
      next();
    } else {
      res.json({status: false, message:'Sorry you are not admin'})
    }
  }
};


