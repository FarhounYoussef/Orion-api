import moment from "moment";

export default {
  Query: {
    productHistories: (parent, { where }, { models, user }) => {
      if (!user) {
        throw new ForbiddenError('Not authenticated as user.');
      }
      return models.ProductHistory.findAll({ where });
    },
    productHistory: (parent, { id }, { models, user }) => {
      if (!user) {
        throw new ForbiddenError('Not authenticated as user.');
      }
      return models.ProductHistory.findByPk(id);
    },
  },
  ProductHistory: {
    createdAt: (parent) => {
      return moment(parent.createdAt).format('YYYY-MM-DD HH:mm:ss Z');
    },
    updatedAt: (parent) => {
      return moment(parent.updatedAt).format('YYYY-MM-DD HH:mm:ss Z');
    },
    user: (parent, args, { models }) => {
      return models.User.findByPk(parent.userId);
    },
  },
};
