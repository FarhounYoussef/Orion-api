import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    prices: [Price]
  }

  extend type Mutation {
    updatePrice(id: ID!, data: PriceInput!): Price
  }

  type Price {
    id: ID!
    layout: String
    size: String
    price: Float
    createdAt: String
    updatedAt: String
  }

  input PriceInput {
    id: ID
    layout: String
    size: String
    price: Float
  }
`;
