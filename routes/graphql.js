var express = require('express');
var router = express.Router();

const auth = require("../models/auth.js");

const visual = true;
const { graphqlHTTP } = require('express-graphql');
const {
    GraphQLSchema, graphql
} = require("graphql");

const RootQueryType = require("../graphql/root.js");


const schema = new GraphQLSchema({
    query: RootQueryType
});

router.post('/',
    (req, res, next) => auth.checkToken(req, res, next),
    graphqlHTTP({
        schema: schema,
        graphiql: visual,
    })
);



module.exports = router;