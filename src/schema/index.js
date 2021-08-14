import { gql } from 'apollo-server-express';
import commandeSchema from './commande';
import commandeHistorySchema from './commandeHistory';
import configSchema from './config';
import priceSchema from './price';
import userSchema from './user';

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
  configSchema,
  commandeSchema,
  commandeHistorySchema,
  priceSchema,
];
