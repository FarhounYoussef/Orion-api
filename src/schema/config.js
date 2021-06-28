import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    configs(where: ConfigInput!): [Config!]
    config(id: ID!): Config
  }

  extend type Mutation {
    createConfig(
      data: ConfigInput!
    ): Config
    updateConfig(
      id: ID!
      data: ConfigInput!
    ): Config
    deleteConfig(id: ID!): Config
  }

  type Config {
    id: ID
    background: String
    onWhite: Boolean
    withConstellations: Boolean
    withGrid: Boolean
    withMoon: Boolean
    location: String
    date: String
    text: String
    latitude: String
    longitude: String
    showTime: Boolean
    time: String
    layout: String
    createdAt: String
    updatedAt: String
  }

  input ConfigInput {
    id: ID
    background: String
    onWhite: Boolean
    withConstellations: Boolean
    withGrid: Boolean
    withMoon: Boolean
    location: String
    date: String
    text: String
    latitude: String
    longitude: String
    showTime: Boolean
    time: String
    layout: String
  }

`;
