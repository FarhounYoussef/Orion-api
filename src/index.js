import {
  ApolloServer,
  AuthenticationError,
} from 'apollo-server-express';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import http from 'http';
import jwt from 'jsonwebtoken';
import models, { sequelize } from './models';
import resolvers from './resolvers';
import schema from './schema';

const getUser = async (req) => {
  const { authorization } = req.headers;
  const token = authorization && authorization.replace('Bearer ', '');

  if (token) {
    try {
      return jwt.verify(token, process.env.SECRET);
    } catch (e) {
      throw new AuthenticationError(
        'Your session expired. Sign in again.',
      );
    }
  }
};

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: async ({ req, connection }) => {
    if (connection) {
      return {
        models,
      };
    }

    if (req) {
      const user = await getUser(req);
      return {
        models,
        user,
        secret: process.env.SECRET,
      };
    }
  },
});

const app = express();

app.use(cors());

server.applyMiddleware({ app, path: '/graphql' });

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

sequelize.sync().then(async () => {
  httpServer.listen({ port: 8000 }, () => {
    console.log('Apollo Server on http://localhost:8000/graphql');
  });
});
