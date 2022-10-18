const dbconnect = require('./dbconfig/db')
const express = require('express')
var bodyParser = require('body-parser')
const cors = require('cors')

dbconnect()

const app = express()
const port = 3002


//need to use middleware to fetch data from api body
app.use(cors())
app.use(bodyParser.json())
app.use(express.json())
//Routes
app.use('/api/user/auth', require('./routes/authenticateUser/register'))
app.use('/api/user', require('./routes/authenticateUser/login'))
app.use('/api/user' ,require('./routes/authenticateUser/getUser'))
app.use('/api/user' ,require('./routes/authenticateUser/getallUser'))
app.use('/api/data', require('./routes/data/fetchalldata'))
app.use('/api/data', require('./routes/data/adddata'))
app.use('/api/data', require('./routes/data/updatedata'))
app.use('/api/data', require('./routes/data/deletedata'))



app.listen(port, () => {
  console.log(`Data on cloud  listening on port http://localhost:${port}`)
})