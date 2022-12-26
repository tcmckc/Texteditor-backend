require('dotenv').config();

const express = require("express");
const app = express();
const port = process.env.PORT || 1337;
const cors = require('cors');
const morgan = require('morgan');

const texteditor = require('./routes/texteditor');
const add = require('./routes/add');
const update = require('./routes/update');

app.use(cors());

// don't show the log when it is test
if (process.env.NODE_ENV !== 'test') {
    // use morgan to log at command line
    app.use(morgan('combined')); // 'combined' outputs the Apache style LOGs
}


app.use('/texteditor', texteditor);
app.use('/add', add);
app.use('/update', update);

app.get("/", (req, res) => {
    res.send("Hello World");
});

// Start up server
const server = app.listen(port, () => console.log(`Example API listening on port ${port}!`));

module.exports = server;
