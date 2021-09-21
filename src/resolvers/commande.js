import { ForbiddenError } from 'apollo-server';
import moment from 'moment';

export default {
  Query: {
    commandes: (_parent, { where = {} }, { models, user }) => {
      if (!user) {
        throw new ForbiddenError('Not authenticated as user.');
      }
      return models.Commande.findAll({ where });
    },
    commande: (_parent, { id }, { models, user }) => {
      if (!user) {
        throw new ForbiddenError('Not authenticated as user.');
      }
      return models.Commande.findByPk(id);
    },
  },
  Mutation: {
    createCommande: async (
      _parent,
      {
        data: {
          client: clientData,
          config: configData,
          preview64,
          ...data
        },
      },
      { models },
    ) => {
      const client = await models.Client.findOrCreate({
        where: { email: clientData.email },
        defaults: clientData,
      });
      const config = await models.Config.create(configData);
      const price = await models.Price.findAll({
        where: { layout: configData.layout },
      });
      return models.Commande.create(
        {
          clientId: client[0].id,
          configId: config.id,
          price: price[0].dataValues.price,
          ...data,
        },
        { context: { client: client[0].dataValues, preview64 } },
      );
    },
    updateCommande: async (
      _parent,
      { id, data },
      { models, user },
    ) => {
      if (!user) {
        throw new ForbiddenError('Not authenticated as user.');
      }
      const commandeInstance = await models.Commande.findByPk(id);
      return commandeInstance.update(data, { context: { user } });
    },
    deleteCommande: async (_parent, { id }, { models, user }) => {
      if (!user) {
        throw new ForbiddenError('Not authenticated as user.');
      }
      await models.Commande.destroy(
        { where: { id } },
        { context: { user } },
      );
      return { id };
    },
  },
  Commande: {
    createdAt: (parent) => {
      return moment(parent.createdAt).format('YYYY-MM-DD HH:mm:ss Z');
    },
    updatedAt: (parent) => {
      return moment(parent.updatedAt).format('YYYY-MM-DD HH:mm:ss Z');
    },
    config: (parent, _args, { models }) => {
      return models.Config.findByPk(parent.configId);
    },
    client: (parent, _args, { models }) => {
      return models.Client.findByPk(parent.clientId);
    },
    commandeHistories: (parent, _args, { models }) => {
      return models.CommandeHistory.findAll({
        where: {
          commandeId: parent.id,
        },
      });
    },
  },
};
