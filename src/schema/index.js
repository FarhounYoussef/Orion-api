import { gql } from 'apollo-server-express';

import userSchema from './user';
import categorySchema from './category';
import productSchema from './product';
import productHistorySchema from './productHistory';
import eventSchema from './event';

const linkSchema = gql`
  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

  type Subscription {
    _: Boolean
  }
`;

export default [
  linkSchema,
  userSchema,
  categorySchema,
  productSchema,
  productHistorySchema,
  eventSchema
];
