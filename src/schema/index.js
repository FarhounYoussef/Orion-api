import { gql } from 'apollo-server-express';

import userSchema from './user';
import configSchema from './config';
import commandeSchema from './commande';
import commandeHistorySchema from './commandeHistory';

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
];
