import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    productHistories(where: ProductHistoryInput!): [ProductHistory!]
    productHistory(id: ID!): ProductHistory
  }

  type ProductHistory {
    id: ID!
    log: Product!
    user: User!
    createdAt: String
    updatedAt: String
  }

  input ProductHistoryInput {
    id: ID
    productId: ID
    userId: ID
  }
`;
