import { gql } from 'apollo-server-express';

export default gql`
  enum valideRole {
    ADMIN
    USER
  }

  extend type Query {
    users(where: UserInput!): [User!]
    user(id: ID!): User
  }

  extend type Mutation {
    createUser(data: UserInput!): User
    updateUser(id: ID!, data: UserInput!): User
    deleteUser(id: ID!): User
    signIn(email: String!, password: String!): Token!
  }

  type User {
    id: ID!
    fullname: String
    firstname: String
    lastname: String
    email: String
    address: String
    password: String
    role: String
    createdAt: String
    updatedAt: String
  }

  input UserInput {
    id: ID
    firstname: String
    lastname: String
    email: String
    address: String
    password: String
    role: String
  }

  type Token {
    token: String!
    user: User!
  }
`;
