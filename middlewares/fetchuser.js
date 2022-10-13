const jwt = require('jsonwebtoken')
const JWT_SECRET_SIGN_KEY = "TOKEN_KEY_DATAONCLOUD"

const fetchUser = (req, res, next) => {
//get the user from token using id
const token = req.header("authorization-token")
if(!token){
res.status(400).json({ error: "token can not empty" })
}
try{
const data = jwt.verify(token,JWT_SECRET_SIGN_KEY )
req.user = data.user
next()

}catch(error){
    res.status(500).json({ error: "Please provide valid Token" })
}


}

module.exports = fetchUser