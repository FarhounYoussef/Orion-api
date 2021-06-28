import moment from "moment";
import { ForbiddenError } from 'apollo-server';

export default {
  Query: {
    commandeHistories: (_parent, { where }, { models, user }) => {
      if (!user) {
        throw new ForbiddenError('Not authenticated as user.');
      }
      return models.CommandeHistory.findAll({ where });
    },
    commandeHistory: (_parent, { id }, { models, user }) => {
      if (!user) {
        throw new ForbiddenError('Not authenticated as user.');
      }
      return models.CommandeHistory.findByPk(id);
    },
  },
  CommandeHistory: {
    createdAt: (parent) => {
      return moment(parent.createdAt).format('YYYY-MM-DD HH:mm:ss Z');
    },
    updatedAt: (parent) => {
      return moment(parent.updatedAt).format('YYYY-MM-DD HH:mm:ss Z');
    },
    user: (parent, _args, { models }) => {
      return models.User.findByPk(parent.userId);
    },
  },
};
