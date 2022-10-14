const express = require('express')
const router = express.Router()
const fetchUser = require('../../middlewares/fetchuser')
const DataSchema = require('../../models/DataSchema')



router.delete('/deletedata/:id', fetchUser, async (req, res) => {
    try {

        //getting data by destructuring 
        const { title, description, tag } = req.body
        console.log("body msg" + req.body)

       

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
        console.log("data matched")
    const datadelete =   await DataSchema.findByIdAndDelete({ _id: req.params.id })
    res.json({success : "Successfully deleted the data", data: datadelete })

                  

    } catch (error) {
        console.log("error" + error)
        res.status(500).json({ error: error })
    }
})







module.exports = router




