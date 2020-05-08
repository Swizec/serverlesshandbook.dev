"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_lambda_1 = require("apollo-server-lambda");
const queries_1 = require("./queries");
const mutations_1 = require("./mutations");
// this is where we define the shape of our API
const schema = apollo_server_lambda_1.gql `
  type Item {
    id: String
    name: String
    body: String
    createdAt: String
    updatedAt: String
  }

  type Query {
    item(id: String!): Item
  }

  type Mutation {
    updateItem(id: String, name: String, body: String): Item
    deleteItem(id: String!): Item
  }
`;
// this is where the shape maps to functions
const resolvers = {
    Query: {
        item: queries_1.item,
    },
    Mutation: {
        updateItem: mutations_1.updateItem,
        deleteItem: mutations_1.deleteItem,
    },
};
const server = new apollo_server_lambda_1.ApolloServer({ typeDefs: schema, resolvers });
exports.handler = server.createHandler({
    cors: {
        origin: "*",
        credentials: true,
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JhcGhxbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9ncmFwaHFsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0RBQXdEO0FBRXhELHVDQUFnQztBQUNoQywyQ0FBb0Q7QUFFcEQsK0NBQStDO0FBQy9DLE1BQU0sTUFBTSxHQUFHLDBCQUFHLENBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBaUJqQixDQUFBO0FBRUQsNENBQTRDO0FBQzVDLE1BQU0sU0FBUyxHQUFHO0lBQ2hCLEtBQUssRUFBRTtRQUNMLElBQUksRUFBSixjQUFJO0tBQ0w7SUFDRCxRQUFRLEVBQUU7UUFDUixVQUFVLEVBQVYsc0JBQVU7UUFDVixVQUFVLEVBQVYsc0JBQVU7S0FDWDtDQUNGLENBQUE7QUFFRCxNQUFNLE1BQU0sR0FBRyxJQUFJLG1DQUFZLENBQUMsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxDQUFDLENBQUE7QUFFbkQsUUFBQSxPQUFPLEdBQUcsTUFBTSxDQUFDLGFBQWEsQ0FBQztJQUMxQyxJQUFJLEVBQUU7UUFDSixNQUFNLEVBQUUsR0FBRztRQUNYLFdBQVcsRUFBRSxJQUFJO0tBQ2xCO0NBQ0YsQ0FBQyxDQUFBIn0=