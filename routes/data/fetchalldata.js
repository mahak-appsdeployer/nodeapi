const express = require('express')
const router = express.Router()
const fetchUser = require('../../middlewares/fetchuser')
const DataSchema = require('../../models/DataSchema')

router.get('/fetchalldata', fetchUser, async (req,res) => {
  const data = await DataSchema.find({user: req.user.id})
  res.send(data)
})





module.exports = router