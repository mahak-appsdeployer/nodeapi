const express = require('express')
const router = express.Router()
const User = require('../../models/UserSchema')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { body, validationResult } = require('express-validator');
const JWT_SECRET_SIGN_KEY = "TOKEN_KEY_DATAONCLOUD"



router.post('/loginuser', [
body('password', 'Password can not be blank').exists(),
    body('email', 'Enter a valid email').isEmail()
], async (req, res) => {
    console.log(req.body)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body

    try {
        let user = await User.findOne({ email: email })
        console.log("user email" + user)
        if (!user) {
            return res.status(400).json({ errormessage: "Login with correctt credentials" })
        }
        console.log("passwrd")
        const paswdcompare = await bcryptjs.compare(password, user.password)
        console.log("paswd compare" + paswdcompare)
        if (!paswdcompare) {
            return res.status(400).json({ errormessage: "Login with correct credentials" })

        }
        const data = {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,

            }
        }

        const authtoken = jwt.sign(data, JWT_SECRET_SIGN_KEY)
        res.json({ success: "true", ...user.toJSON(), authtoken: authtoken })
    } catch (error) {
        res.status(500).json({ error: "Internal server error occured" })
    }

})


module.exports = router