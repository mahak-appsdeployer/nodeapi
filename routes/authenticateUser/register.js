const express = require('express')
const router = express.Router()
const User = require('../../models/UserSchema')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { body, validationResult } = require('express-validator');
const JWT_SECRET_SIGN_KEY="TOKEN_KEY_DATAONCLOUD"


router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 1 }),
    body('password', 'Password must be of 8 characters long').isLength({ min: 8 }),
    body('email', 'enter a valid email').isEmail()
] ,async (req,res) => {
    console.log(req.body)
    //check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
try{

    let user = await  User.findOne({email: req.body.email})
    console.log("create email" + user)
    if(user){
       return  res.status(400).json({succcess: 'false',errormessage: "User already exist"})
    }
    const salt = await bcryptjs.genSaltSync(10)     
    const password = await bcryptjs.hash(req.body.password, salt)  //salt and hash return promise hence need to await
    user =   await  User.create({
        name: req.body.name,
        email: req.body.email,
            password: password,
          })

res.json({success: 'true',...user.toJSON()})
          //.then(user => res.json(user)).catch(err => res.json({error: "Please enter valid values"}));
        }catch(err){
            res.status(500).json({succcess: 'false',error:"Internal server error occured"})
        }
          // can also use this method instead of user.create
    // const user = User(req.body)
    //user.save()
    //res.send(req.body)
})


module.exports = router