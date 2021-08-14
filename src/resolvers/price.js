import moment from 'moment';

export default {
  Query: {
    prices: (_parent, {}, { models }) => {
      return models.Price.findAll({ where: {} });
    },
  },
  Mutation: {
    updatePrice: async (_parent, { id, data }, { models, user }) => {
      if (!user) {
        throw new ForbiddenError('Not authenticated as user.');
      }
      const priceInstance = await models.Price.findByPk(id);
      return priceInstance.update(data);
    },
  },
  Price: {
    createdAt: (parent) => {
      return moment(parent.createdAt).format('YYYY-MM-DD HH:mm:ss Z');
    },
    updatedAt: (parent) => {
      return moment(parent.updatedAt).format('YYYY-MM-DD HH:mm:ss Z');
    },
  },
};
