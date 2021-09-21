import { ForbiddenError } from 'apollo-server';
import moment from 'moment';

export default {
  Query: {
    clients: (_parent, { where }, { models, user }) => {
      if (!user) {
        throw new ForbiddenError('Not authenticated as user.');
      }
      return models.Client.findAll({ where });
    },
    client: (_parent, { id }, { models, user }) => {
      if (!user) {
        throw new ForbiddenError('Not authenticated as user.');
      }
      return models.Client.findByPk(id);
    },
  },
  Mutation: {
    createClient: (_parent, { data }, { models, user }) => {
      if (!user) {
        throw new ForbiddenError('Not authenticated as user.');
      }
      return models.Client.create(data);
    },
    updateClient: async (_parent, { id, data }, { models, user }) => {
      if (!user) {
        throw new ForbiddenError('Not authenticated as user.');
      }
      const userInstance = await models.Client.findByPk(id);
      return userInstance.update(data, { context: { user } });
    },
    deleteClient: async (_parent, { id }, { models, user }) => {
      if (!user) {
        throw new ForbiddenError('Not authenticated as user.');
      }
      await models.Client.destroy({ where: { id } });
      return { id };
    },
  },
  Client: {
    fullname: (parent) => {
      return `${parent.firstname} ${parent.lastname}`;
    },
    createdAt: (parent) => {
      return moment(parent.createdAt).format('YYYY-MM-DD HH:mm:ss Z');
    },
    updatedAt: (parent) => {
      return moment(parent.updatedAt).format('YYYY-MM-DD HH:mm:ss Z');
    },
  },
};
