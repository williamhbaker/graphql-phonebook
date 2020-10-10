import { gql } from 'apollo-server';

const typeDefs = gql`
  extend type Person @key(fields: "id") {
    id: ID! @external
  }

  type User {
    username: String!
    friends: [Person!]!
    id: ID!
  }

  type Token {
    value: String!
  }

  extend type Query {
    me: User
  }

  extend type Mutation {
    createUser(username: String!): User
    login(username: String!, password: String!): Token
  }
`;

export default typeDefs;
