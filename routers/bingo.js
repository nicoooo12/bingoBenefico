const express = require('express')
const router = express.Router()

router.get('/', (req,res)=>{
  res.render('bingo/visual')
})


module.exports = router