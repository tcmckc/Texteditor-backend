const express = require('express');
const router = express.Router();

const texteditorModel = require('../models/texteditor');

router.get(
    "/",
    async (req, res) => {
        const docs = await texteditorModel.getAllDocs();

        return res.json({
            data: docs
        });
    }
);

router.get(
    "/init",
    async (req, res) => {
        await texteditorModel.init();

        res.send("tjo tjim!");
    }
);

module.exports = router;
