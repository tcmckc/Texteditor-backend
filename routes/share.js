var express = require('express');
var router = express.Router();
const texteditorModel = require('../models/texteditor');
const bodyParser = require("body-parser");
const ObjectId = require('mongodb').ObjectId;

var jsonParser = bodyParser.json();

router.post(
    '/',
    jsonParser,
    async (req, res) => {
        const doc = req.body;

        console.log("req.body!!:", doc);
        
        const filter = { _id: ObjectId(doc["_id"]) };
        const docEditor = doc.editor ;

        if (doc._id && doc.editor) {
            const result = await texteditorModel.addEditor(filter, docEditor);

            console.log("result", result);
            return res.status(201).json({ data: result });
        } else {
            return res.status(400).json({ errors: {
                message: "Email or id is missing."
            }});
        }
    }
);

module.exports = router;
