const mongoose = require('mongoose');
const dbURI = "mongodb://localhost:27017/notesdata"


const connectdb = () => {
    mongoose.connect(dbURI, ()=>{
        console.log("Database Connect successfully")
    })
}


module.exports = connectdb
