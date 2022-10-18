const express = require('express')
const router = express.Router()
const fetchUser = require('../../middlewares/fetchuser')
const DataSchema = require('../../models/DataSchema')
const { body, validationResult } = require('express-validator');


router.post('/adddata', fetchUser, [
    body('title', 'must provide title to your data').exists(),
    body('description', 'Description must be 5 characters long').isLength({ min: 5 }),
], async (req, res) => {

    try {
        const { title, description, tag } = req.body
        console.log(req.body)
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        //adding data by using scheme and req.body
        const data = new DataSchema({
            title, description, tag, userid: req.user.id
        })
        console.log("add data" + data)

        const saveddata = data.save()
        console.log("saved data" + saveddata)

        res.status(200).json({ resultdata : data })
    } catch (error) {
        res.status(500).json({ error: "Internal server error occured" })
        
    }
})





module.exports = router