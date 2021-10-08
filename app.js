"use strict";
const port = process.env.PORT || 1337;
const express = require("express");
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');

const index = require('./routes/index');
const documents = require('./routes/documents');
const login = require('./routes/login');
const register = require('./routes/register');
const { log } = require("console");

const auth = require("./models/auth.js");


const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer, {
    cors: {
      origin: 'http://www.student.bth.se',
      methods: ["GET", "POST"]
    }
});

io.on('connection', function(socket) {
    let lastId;
    socket.on('create', function(room) {
        socket.leave(lastId);
        socket.join(room);
        lastId = room;
        socket.on("doc", function(data) {
            socket.to(data["_id"]).emit("doc", data);
        });
    });
});




// GraphQL
const visual = true;
const { graphqlHTTP } = require('express-graphql');
const {
    GraphQLSchema
} = require("graphql");

const RootQueryType = require("./graphql/root.js");


const schema = new GraphQLSchema({
    query: RootQueryType
});



app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    console.log(req.method);
    console.log(req.path);
    next();
})

app.use('/', index);
app.use('/documents', documents);
app.use('/login', login);
app.use('/register', register);

app.use('/graphql', 
    graphqlHTTP({
        schema: schema,
        graphiql: visual,
}));


// don't show the log when it is test
if (process.env.NODE_ENV !== 'test') {
    // use morgan to log at command line
    app.use(morgan('combined')); // 'combined' outputs the Apache style LOGs
}

app.use((req, res, next) => {
    let err = new Error("Not Found");
    err.status = 404;
    next(err);
})

app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err)
    }

    res.status(err.status || 500).json({
        "errors": [
            {
                "status": err.status,
                "title": err.title,
                "details": err.message
            }
        ]
    });
})

const server = httpServer.listen(port, () => console.log('Listening on port ' + port));

module.exports = server;