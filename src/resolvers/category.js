import moment from "moment";
import { ForbiddenError } from 'apollo-server';

export default {
    Query: {
      categories: (parent, args, { models, user }) => {
        if (!user) {
          throw new ForbiddenError('Not authenticated as user.');
        }
        return models.Category.findAll();
      },
      category: (parent, { id }, { models, user }) => {
        if (!user) {
          throw new ForbiddenError('Not authenticated as user.');
        }
        return models.Category.findByPk(id);
      },
    },
    Mutation:{
      createCategory: (parent, { data }, { models, user }) => {
        if (!user) {
          throw new ForbiddenError('Not authenticated as user.');
        }
        return models.Category.create(data);
      },
      updateCategory  : async (parent, { id, data }, { models, user }) => {
        if (!user) {
          throw new ForbiddenError('Not authenticated as user.');
        }
        const categoryInstance = await models.Category.findByPk(id);
        return categoryInstance.update(data, { context: { user } });
      },
      deleteCategory: async (parent, { id }, { models, user }) => {
        if (!user) {
          throw new ForbiddenError('Not authenticated as user.');
        }
        await models.Category.destroy({ where: { id } });
        return { id };
      },
    },
    Category: {
      createdAt: (parent) => {
        return moment(parent.createdAt).format('YYYY-MM-DD HH:mm:ss Z')
      },
      updatedAt: (parent) => {
        return moment(parent.updatedAt).format('YYYY-MM-DD HH:mm:ss Z')
      },
      products: (parent, args, { models }) => {
        return models.Product.findAll({
          where: {
            categoryId: parent.id,
          },
        });
      },
    },
  };
  