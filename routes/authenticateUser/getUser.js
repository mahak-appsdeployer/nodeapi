const express = require('express')
const router = express.Router()
const User = require('../../models/UserSchema')
const fetchUser = require('../../middlewares/fetchuser')
const jwt = require('jsonwebtoken')



router.get('/getUser', fetchUser, async (req,res) => {
    try{
const userid = req.user.id
const user = await User.findById(userid).select("-password")
res.send(user)
    }catch(error){
        res.status(500).json({error:"Internal server error occured"})
    }
})


module.exports = router