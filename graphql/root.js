const {
    GraphQLObjectType,
    GraphQLList,
} = require('graphql');

const DocType = require('./doc.js');
const documents = require('../models/texteditor.js');

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        documents: {
            type: new GraphQLList(DocType),
            description: 'List of all documents',
            resolve: async function() {
                const allDocs = await documents.getAllDocs();
                return allDocs;
            }
        }
    })
});

module.exports = RootQueryType;
