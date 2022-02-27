import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    configs(where: ConfigInput!): [Config!]
    config(id: ID!): Config
  }

  extend type Mutation {
    createConfig(data: ConfigInput!): Config
    updateConfig(id: ID!, data: ConfigInput!): Config
    deleteConfig(id: ID!): Config
  }

  type Config {
    id: ID
    backgroundColor: String
    onWhite: Boolean
    isConstellation: Boolean
    isGraticule: Boolean
    isMilky: Boolean
    location: String
    date: String
    topText: String
    bottomText: String
    latitude: String
    longitude: String
    showTime: Boolean
    time: String
    layout: String
    size: String
    borderColor: String
    createdAt: String
    updatedAt: String
  }

  input ConfigInput {
    id: ID
    backgroundColor: String
    onWhite: Boolean
    isConstellation: Boolean
    isGraticule: Boolean
    isMilky: Boolean
    location: String
    date: String
    topText: String
    bottomText: String
    latitude: String
    longitude: String
    showTime: Boolean
    time: String
    layout: String
    size: String
    borderColor: String
  }
`;
