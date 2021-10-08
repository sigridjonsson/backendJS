const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
} = require('graphql');

const DocumentType = new GraphQLObjectType({
    name: 'Document',
    description: 'This represents a course',
    fields: () => ({
        _id: { type: GraphQLString },
        name: { type: GraphQLString },
        text: { type: GraphQLString },
        owner: { type: GraphQLString },
        allowed_users: { type: GraphQLList(GraphQLString)}
    })
})

module.exports = DocumentType;