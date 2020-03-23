const jwt = require('jsonwebtoken')
require('dotenv').config()

//middleware function
function auth(req, res , next){ //get the token from any frontend
  const token = req.header('x-auth-token')

  //check for token
  if(!token)
    //401 means unauthorized
    res.status(401).json({msg: 'No token, authorization denied!'})

  try{
    //verify token if there is a token
    const decoded = jwt.verify(token, process.env.jwtSecret)
    //Add user
    req.user = decoded
    next(); //to call the next piece of middleware
  }
  catch(e){ //to display the error in case of invalid token
    res.status(400).json({msg:'Token not valid!'})
  }
}

module.exports = auth