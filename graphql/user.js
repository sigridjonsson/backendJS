const {
    GraphQLObjectType,
    GraphQLString,
} = require('graphql');

const UserType = new GraphQLObjectType({
    name: 'Users',
    description: 'This represents a user',
    fields: () => ({
        _id: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
    })
})

module.exports = UserType;