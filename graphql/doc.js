const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLString,
    GraphQLNonNull
} = require('graphql');

const DocumentType = new GraphQLObjectType({
    name: 'Document',
    description: 'This represents a document',
    fields: () => ({
        _id: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: GraphQLString },
        text: { type: GraphQLString },
        editor: { type: new GraphQLList(GraphQLString) }
    })
});

module.exports = DocumentType;