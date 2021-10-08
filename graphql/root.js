const {
    GraphQLObjectType,
    GraphQLList,
} = require('graphql');

const DocumentType = require("./document.js");
const UserType = require("./user.js");

const data = require("../models/data.js");

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        documents: {
            type: GraphQLList(DocumentType),
            description: 'List of all documents',
            resolve: async function() {
                let answer = await data.getAll();
                return answer;
            }
        },
        users: {
            type: GraphQLList(UserType),
            description: 'List of all users',
            resolve: async function() {
                let answer = await data.getAllUsers();
                return answer;
            }
        },

    })
});

module.exports = RootQueryType;