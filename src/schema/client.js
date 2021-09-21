import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    clients(where: ClientInput!): [Client!]
    client(id: ID!): Client
  }

  extend type Mutation {
    createClient(data: ClientInput!): Client
    updateClient(id: ID!, data: ClientInput!): Client
    deleteClient(id: ID!): Client
  }

  type Client {
    id: ID!
    fullname: String
    firstname: String
    lastname: String
    email: String
    address: String
    createdAt: String
    updatedAt: String
  }

  input ClientInput {
    id: ID
    firstname: String
    lastname: String
    email: String
    address: String
  }
`;
