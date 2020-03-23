const express = require('express')
const router = express.Router();
const item = require('../models/item')
const auth = require('../middlware/auth')

router.get('/', (req,res)=>{
  //we can use sort function in mongodb. In this case sort by date in descending order
  item.find().sort({date:-1})
  .then(items=>{
    res.json(items)
  })
})

//now we add authentication to the routes so that they are protected by an authentication
//now private
router.post('/', auth, (req,res)=>{

  item.create(req.body).then(item=>{
    res.json(item)
  }).catch(err=>{
    res.json(err)
  })
})

//now this is private
router.delete('/:id', auth, (req,res)=>{
  item.findByIdAndDelete({_id:req.params.id}, {
    name: req.body.name,
    date: req.body.date
  }).then(()=>{
    res.json('Item deleted')
  }).catch(err=>{
    res.status(404).json({success:false})
  })
})

module.exports = router;