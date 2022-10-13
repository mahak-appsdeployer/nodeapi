const mongoose = require('mongoose')

const {Schema} = mongoose
const Dataschema = Schema({
    //here we want no other user can see each other data so we uniquely identify it by using foreign key of other Schema User and use userid and this gives us to store the user
    userid:{
type: mongoose.Schema.Types.ObjectId,
ref:'datauser'
    },
    title: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true,
      
    },
    tag:{
        type: String,
        default: "General"
    },
    date:{
        type: Date,
       default: Date.now
    },
    
})



module.exports = mongoose.model('ndata', Dataschema)