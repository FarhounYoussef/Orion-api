import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    categories: [Category!]
    category(id: ID!): Category
  }

  extend type Mutation {
    createCategory(
      data: CategoryInput!
    ): Category
    updateCategory(
      id: ID!
      data: CategoryInput!
    ): Category
    deleteCategory(id: ID!): Category
  }

  type Category {
    id: ID!
    name: String!
    products: [Product]
    createdAt: String
    updatedAt: String
  }

  input CategoryInput {
    id: ID
    name: String
  }
`;
