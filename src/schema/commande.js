import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    commandes(where: CommandeInput): [Commande!]
    commande(id: ID!): Commande
  }

  extend type Mutation {
    createCommande(data: CommandeInput!): Commande
    updateCommande(id: ID!, data: CommandeInput!): Commande
    deleteCommande(id: ID!): Commande
  }

  type Commande {
    id: ID!
    ref: String
    status: String
    price: Float
    client: Client
    config: Config
    commandeHistories: [CommandeHistory]
    createdAt: String
    updatedAt: String
  }

  input CommandeInput {
    ref: String
    status: String
    price: Float
    client: ClientInput
    config: ConfigInput
    preview64: String
  }
`;
