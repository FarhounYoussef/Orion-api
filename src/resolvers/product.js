import moment from "moment";
import { ForbiddenError } from 'apollo-server';

export default {
  Query: {
    products: (parent, { where }, { models, user }) => {
      if (!user) {
        throw new ForbiddenError('Not authenticated as user.');
      }
      return models.Product.findAll({ where });
    },
    product: (parent, { id }, { models, user }) => {
      if (!user) {
        throw new ForbiddenError('Not authenticated as user.');
      }
      return models.Product.findByPk(id);
    },
  },
  Mutation: {
    createProduct: (parent, { data }, { models, user }) => {
      if (!user) {
        throw new ForbiddenError('Not authenticated as user.');
      }
      return models.Product.create(data, { context: { user } });
    },
    updateProduct: async (parent, { id, data }, { models, user }) => {
      if (!user) {
        throw new ForbiddenError('Not authenticated as user.');
      }
      const productInstance = await models.Product.findByPk(id);
      return productInstance.update(data, { context: { user } });
    },
    deleteProduct: async (parent, { id }, { models, user }) => {
      if (!user) {
        throw new ForbiddenError('Not authenticated as user.');
      }
      await models.Product.destroy({ where: { id } }, { context: { user } });
      return { id };
    },
  },
  Product: {
    createdAt: (parent) => {
      return moment(parent.createdAt).format('YYYY-MM-DD HH:mm:ss Z')
    },
    updatedAt: (parent) => {
      return moment(parent.updatedAt).format('YYYY-MM-DD HH:mm:ss Z')
    },
    category: (parent, args, { models }) => {
      return models.Category.findByPk(parent.categoryId);
    },
    productHistories: (parent, args, { models }) => {
      return models.ProductHistory.findAll({
        where: {
          productId: parent.id,
        },
      });
    },
  },
};
