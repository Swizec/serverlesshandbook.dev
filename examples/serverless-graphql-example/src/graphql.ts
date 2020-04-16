import { ApolloServer, gql } from "apollo-server-lambda"

import { item } from "./queries"
import { updateItem, deleteItem } from "./mutations"

// this is where we define the shape of our API
const schema = gql`
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
`

// this is where the shape maps to functions
const resolvers = {
  Query: {
    item,
  },
  Mutation: {
    updateItem,
    deleteItem,
  },
}

const server = new ApolloServer({ typeDefs: schema, resolvers })

export const handler = server.createHandler({
  cors: {
    origin: "*", // for security in production, lock this to your real endpoints
    credentials: true,
  },
})
