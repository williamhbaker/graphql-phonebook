import { gql } from 'apollo-server';

const typeDefs = gql`
  type Person @key(fields: "id") {
    id: ID!
    name: String!
    phone: String
    address: Address!
  }

  type Address {
    street: String!
    city: String!
  }

  extend type Query {
    personCount: Int!
    allPersons: [Person!]!
    findPerson(name: String!): Person
  }

  extend type Mutation {
    createPerson(
      name: String!
      phone: String
      street: String!
      city: String!
    ): Person

    editNumber(name: String!, phone: String!): Person
  }
`;

export default typeDefs;
