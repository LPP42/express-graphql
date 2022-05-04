const fs = require('fs');
const graphql = require('graphql');
const gqlTools = require('graphql-Tools');

const gqlSchemaLoader = {};

gqlSchemaLoader.load = (schema, resolvers) => {
    let fdata = fs.readFileSync(schema, 'utf8');
    return gqlTools.makeExecutableSchema({
        typeDefs:fdata,
        resolvers: resolvers,
    })
};

module.exports = gqlSchemaLoader;