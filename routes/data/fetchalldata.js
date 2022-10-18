const express = require('express')
const router = express.Router()
const fetchUser = require('../../middlewares/fetchuser')
const DataSchema = require('../../models/DataSchema')

router.get('/fetchalldata', fetchUser, async (req,res) => {
  console.log("id" + req)
  const data = await DataSchema.find({userid: req.user.id})
  console.log("user id" + data.userid)
  res.status(200).json({ success: "true", data: data })
})





module.exports = router