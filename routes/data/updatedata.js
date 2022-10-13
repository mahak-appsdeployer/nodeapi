const express = require('express')
const router = express.Router()
const fetchUser = require('../../middlewares/fetchuser')
const DataSchema = require('../../models/DataSchema')
const { body, validationResult } = require('express-validator');


router.put('/updatedata/:id', fetchUser, async (req, res) => {
    try {

        //getting data by destructuring 
        const { title, description, tag } = req.body
        console.log("body msg" + req.body)

        //new data object
        const newdata = {}
        if (title) { newdata.title = title }
        if (description) { newdata.description = description }
        if (tag) { newdata.tag = tag }
        console.log("new data" + newdata.title)

        //find the paticular data by it's id
        const data = await DataSchema.findById({ _id: req.params.id })
        console.log("data" + data)

        if (!data) {
            res.status(404).json({ error: "Not Found" })
        }

        //check if data belongs to that user or not 
        if (data.userid.toString() !== req.user.id) {
            res.status(401).json({ error: "Not Allowed to update" })
        }
        console.log("data matched" + newdata.title)
      await DataSchema.findByIdAndUpdate({ _id: req.params.id }, 
            { $set: { title: newdata.title, description: newdata.description, tag: newdata.tag } }, 
        ).then(result => {console.log("result" + result), res.json(result)}).catch(err => console.log("error" + err))
      
        

    } catch (error) {
        console.log("error" + error)
        res.status(500).json({ error: error })
    }
})





module.exports = router