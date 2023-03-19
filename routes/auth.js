const express = require('express');
const router = express.Router();
//const bodyParser = require("body-parser");
const usersModel = require('../models/users');

//var jsonParser = bodyParser.json();

router.post(
    "/register",
    async (req, res) => {
        const body = req.body;

        await usersModel.register(res, body);

        // const result = usersModel.register(body);
        // console.log(result);
        // return res.json(result);
    }
);

router.post(
    "/login",
    async (req, res) => {
        const body = req.body;

        await usersModel.login(res, body);
    }
);
 
module.exports = router;
