require('dotenv').config();

const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const visual = true; // set false when release product
const { graphqlHTTP } = require('express-graphql');
const {
    GraphQLSchema
} = require('graphql');

const RootQueryType = require('./graphql/root.js');

const app = express();
const httpServer = require('http').createServer(app);

const port = process.env.PORT || 1337;

const texteditor = require('./routes/texteditor');
const add = require('./routes/add');
const update = require('./routes/update');
const auth = require('./routes/auth');
const share = require('./routes/share');

app.use(cors());

// don't show the log when it is test
if (process.env.NODE_ENV !== 'test') {
    // use morgan to log at command line
    app.use(morgan('combined')); // 'combined' outputs the Apache style LOGs
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/texteditor', texteditor);
app.use('/add', add);
app.use('/update', update);
app.use('/auth', auth);
app.use('/share', share);

const schema = new GraphQLSchema({
    query: RootQueryType
});

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: visual,
}));

app.get("/", (req, res) => {
    res.send("Welcome to my-app-backend");
});

// Create socket.io server
const io = require("socket.io")(httpServer, {
    cors: {
        origin: '*',
        methods: ["GET", "POST"]
    }
});

// let throttleTimer;

// connect with client
io.on('connection', function(socket) {
    console.log("a user connected");

    // receive from client
    socket.on('send_text', (data) => {
        console.log("send_text", data);

        // send to client
        io.emit('received_text', data);
    });

    socket.on('disconnect', () => {
        console.log("disconnected with a user");
    });
});

// Start up server
const server = httpServer.listen(port, () =>
    console.log(`Example API listening on port ${port}!`)
);

module.exports = server;
