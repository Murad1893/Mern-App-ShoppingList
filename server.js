//declaring constants
const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const cors = require('cors')

const app = express();

const uri = process.env.atlas

const path = require('path') //just for paths

//connect to mongodb
mongoose.connect(uri, {
  useNewUrlParser: true, 
  useCreateIndex: true,
  useUnifiedTopology: true 
})
mongoose.connection.once('open', ()=>{
  console.log('MongoDB Connected!')
})

//middleware
app.use(cors())
app.use(express.json())

//Routes
app.use('/api/items', require('./routes/itemRouter')) //routing
app.use('/api/users', require('./routes/userRouter'))
app.use('/api/auth', require('./routes/authRouter'))

//Serve static assets if in production (static assets is the build folder)
if(process.env.NODE_ENV === 'production'){
  //Set a static folder
  app.use(express.static('client/build')) //setting the static folder

  //get anything
  app.get('*', (req,res)=>{ //so any request that is not the same as the route above should load up the index.html file
    //load the index.html file
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')) // '/client/build/index.html'

    //so this should load the index.html file as long as it does not hit any api and is in production
  })
}

//start on port

const port = process.env.PORT || process.env.port;
app.listen(port, ()=>{
  console.log('Server listening to port: ' + port)
})