const express = require('express');
const router = express.Router();
const usersModel = require('../models/users');

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

        const result = await usersModel.login(res, body);

        console.log("LOGIN", result);
    }
);

module.exports = router;
