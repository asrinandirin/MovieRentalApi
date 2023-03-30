const jwt = require('jsonwebtoken');
const config = require('config');

function auth(req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) res.status(401).send('Access Denied. No token given.');
  
  try {
    //If this success, It return payload
    const payload = jwt.verify(token, config.get('jwtPrivateKey'));
    req.user = payload
    next()
  } catch (error) {
    console.log('Token could not be verified');
    res.status(400).send('Invalid Token');
  }
}


exports.auth = auth
