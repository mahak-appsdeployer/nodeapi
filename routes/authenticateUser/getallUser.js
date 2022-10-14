
const express = require('express')
const router = express.Router()

const UserSchema = require('../../models/UserSchema')

router.get('/getallUser', async (req,res) => {
  const data = await UserSchema.find()
  res.send(data)
})







module.exports = router