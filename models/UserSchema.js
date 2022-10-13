const mongoose = require('mongoose')
const {Schema} = mongoose

const Userschema = Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    date:{
        type: Date,
       default: Date.now
    },
    
})


const User = mongoose.model('datauser', Userschema)
//User.createIndexes()  //one way to create different indexes and not allowed duplicate entries
module.exports = User