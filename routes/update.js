const ObjectId = require('mongodb').ObjectId;
var express = require('express');
var router = express.Router();
const texteditorModel = require('../models/texteditor')
const bodyParser = require("body-parser");

var jsonParser = bodyParser.json()


router.post(
    '/',
    jsonParser,
    async (req, res) => {
        const doc = req.body;
        console.log("req.body:", doc);

        const filter = { _id: ObjectId(doc["_id"]) };
        const docText = {
            text: doc.text
        }

        if (doc.text && doc.name) {
            const result = await texteditorModel.updateDoc(filter, docText);

            return res.status(201).json({ data: result });
        } else {
            return res.status(400).json({ errors: {
                message: "Name or text missing."
            }});
        }
    },

);

module.exports = router;
