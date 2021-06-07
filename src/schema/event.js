import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    events(where: EventInput!): [Event!]
    event(id: ID!): Event
    currentEvent: Event
  }

  extend type Mutation {
    createEvent(
      data: EventInput!
    ): Event
    updateEvent(
      id: ID!
      data: EventInput!
    ): Event
    deleteEvent(id: ID!): Event
  }

  extend type Subscription {
    eventShow: Event!
    eventStarted: Event!
  }

  type Event {
    id: ID
    duration: Float
    products: [ProductEvent]
    user: User
    startAt: String
    endAt: String
    createdAt: String
    updatedAt: String
    currentDate: String
  }

  input EventInput {
    id: ID
    duration: Float
    products: [ProductEventInput]
    userId: ID
    startAt: String
    endAt: String
  }

  type ProductEvent {
    id: ID
    name: String
    initialPrice: Float
    price: Float
  }

  input ProductEventInput {
    id: ID
    name: String
    initialPrice: Float
    price: Float
  }
`;
