const express = require('express')
const router = express.Router();
const user = require('../models/user')
const bcrypt = require('bcryptjs')
require('dotenv').config()
const jwt = require('jsonwebtoken')

// router.get('/', (req,res)=>{
//   res.send('register')
// })

router.post('/', (req,res)=>{
  const {name, email, password} = req.body;
  
  //check if the fields are not empty
  if(!name || !email || !password){
    return res.status(400).json({msg: 'Please enter all details'})
  }

  //check for existing user
  //{x: x} is same as {x}
  user.findOne({email}).then(tmp_user=>{
    // if user not null
    if(tmp_user){ 
      return res.status(400).json({msg: 'User already exists'})
    }
    else{
      const newUser = new user({
        name,
        email,
        password
      })
    //now we have made the new user but we cannot directly assign the password field without hashing
    //so we use bcrypt for it
    //we use genSalt, the higher the more secure but takes more time
    bcrypt.genSalt(10, (err, salt)=>{
      bcrypt.hash(newUser.password, salt, (err, hash)=>{
        if(err) throw err
        else{
          newUser.password = hash;
          newUser.save() //save the user to the database
          .then(user=>{

            //we will sign the token here, and add a payload
            jwt.sign(
              {id: user.id},
              process.env.jwtSecret,
              {expiresIn: 3600}, //expiry time in 1 hr
              //incase of async we also mention the callback
              (err, token)=>{
                if (err) throw err
                else{
                  res.json({
                    token, //added token for jwt authentication
                    user:{
                      id: user.id,
                      name: user.name,
                      email: user.email
                    }
                  })
                }
              }
            )
          })
        } 
      })
    })
    }
  })
})
module.exports = router;