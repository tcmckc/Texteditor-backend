const express = require('express');
const router = express.Router();
const inviteModel = require("../models/invite");
const bodyParser = require("body-parser");

var jsonParser = bodyParser.json();

router.post(
    '/',
    jsonParser,
    async (req, res) => {
        const doc = req.body;

        console.log("invite.js: ", req.body);

        if (doc.recipient) {
            const result = await inviteModel.send(req, res);

            console.log(result);
            return res.status(201).json({data: result});
        } else {
            return res.status(400).json({
                errors: {
                    message: "Email is missing."
                }});
        }
    }
);

module.exports = router;
