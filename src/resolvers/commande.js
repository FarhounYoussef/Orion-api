import { ForbiddenError } from 'apollo-server';
import moment from 'moment';
import { decrypt } from '../utils/helpers';

export default {
  Query: {
    commandes: (_parent, { where = {} }, { models, user }) => {
      if (!user) {
        throw new ForbiddenError('Not authenticated as user.');
      }
      return models.Commande.findAll({ where });
    },
    commande: async (
      _parent,
      { where: { ref } },
      { models, user },
    ) => {
      const result = await models.Commande.findOne({
        where: { ref },
      });
      return result;
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
      const client = await models.Client.create(clientData);
      const config = await models.Config.create(configData);
      const price = await models.Price.findOne({
        where: { layout: configData.layout, size: configData.size },
      });
      return models.Commande.create(
        {
          clientId: client.id,
          configId: config.id,
          price: price.dataValues.price,
          ...data,
        },
        { context: { client: client.dataValues, preview64 } },
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
