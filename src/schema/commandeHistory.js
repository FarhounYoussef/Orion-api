import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    commandeHistories(where: CommandeHistoryInput!): [CommandeHistory!]
    commandeHistory(id: ID!): CommandeHistory
  }

  type CommandeHistory {
    id: ID!
    log: Commande!
    user: User!
    createdAt: String
    updatedAt: String
  }

  input CommandeHistoryInput {
    id: ID
    commandeId: ID
    userId: ID
  }
`;
