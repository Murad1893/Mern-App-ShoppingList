const express = require('express')
const router = express.Router();
const user = require('../models/user')
const bcrypt = require('bcryptjs')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const auth = require('../middlware/auth')

// router.get('/', (req,res)=>{
//   res.send('register')
// })

router.post('/', (req,res)=>{ //we use post request here as it send the data in the request body
  const {email, password} = req.body;
  
  //check if the fields are not empty
  if(!email || !password){
    return res.status(400).json({msg: 'Please enter all details'})
  }

  //check for existing user
  //{x: x} is same as {x}
  user.findOne({email}).then(tmp_user=>{
    // if user not null
    if(!tmp_user){ 
      return res.status(400).json({msg: 'User does not exist'})
    }
    
    //Validating password
    bcrypt.compare(password, tmp_user.password)
    .then(isMatch=>{
      if(!isMatch) return res.status(400).json({msg: 'Invalid credentials'})

      else{
        jwt.sign(
          {id: tmp_user.id},
          process.env.jwtSecret,
          {expiresIn: 3600}, //expiry time in 1 hr
          //incase of async we also mention the callback
          (err, token)=>{
            if (err) throw err
            else{
              res.json({
                token, //added token for jwt authentication
                user:{
                  id: tmp_user.id,
                  name: tmp_user.name,
                  email: tmp_user.email
                }
              })
            }
          }
        )
      }
    })

  })
})

//this will allow it to know what user it is based on the token
router.get('/user', auth, (req,res)=>{
  user.findById(req.user.id) //this req.user.id is the jwt id that is received from auth
  .select('-password') //this will disregard the pass
  .then(tmp_user=>
    res.json(tmp_user))
})

module.exports = router;