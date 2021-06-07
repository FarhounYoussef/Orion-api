import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    products(where: ProductInput!): [Product!]
    product(id: ID!): Product
  }

  extend type Mutation {
    createProduct(
      data: ProductInput!
    ): Product
    updateProduct(
      id: ID!
      data: ProductInput!
    ): Product
    deleteProduct(id: ID!): Product
  }

  type Product {
    id: ID!
    name: String!
    currentPrice: Float
    initialPrice: Float
    minPrice: Float
    maxPrice: Float
    category: Category!
    productHistories: [ProductHistory]
    createdAt: String
    updatedAt: String
  }

  input ProductInput {
    name: String
    currentPrice: Float
    initialPrice: Float
    minPrice: Float
    maxPrice: Float
    categoryId: ID
  }
`;
