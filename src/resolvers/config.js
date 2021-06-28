import moment from 'moment';
import { ForbiddenError } from 'apollo-server';


export default {
  Query: {
    configs: (_parent, { where }, { models, user }) => {
      if (!user) {
        throw new ForbiddenError('Not authenticated as user.');
      }
      return models.Config.findAll({ where });
    },
    config: (_parent, { id }, { models, user }) => {
      if (!user) {
        throw new ForbiddenError('Not authenticated as user.');
      }
      return models.Config.findByPk(id);
    },
  },
  Mutation: {
    createConfig: (_parent, { data: objectData }, { models, user }) => {
      if (!user) {
        throw new ForbiddenError('Not authenticated as user.');
      }
      const data = JSON.parse(JSON.stringify(objectData));
      data.userId = user.id;
      data.endAt = moment(new Date(data.startAt))
        .add(data.duration, 's')
        .format();
      return models.Config.create(data, { context: { user } });
    },
    updateConfig: async (_parent, { id, data }, { models, user }) => {
      if (!user) {
        throw new ForbiddenError('Not authenticated as user.');
      }
      const configInstance = await models.Config.findByPk(id);
      return configInstance.update(data, { context: { user } });
    },
    deleteConfig: async (_parent, { id }, { models, user }) => {
      if (!user) {
        throw new ForbiddenError('Not authenticated as user.');
      }
      await models.Config.destroy(
        { where: { id } },
        { context: { user } },
      );
      return { id };
    },
  },
  Config: {
    date: () => {
      return moment().format('YYYY-MM-DD HH:mm:ss Z');
    },
    createdAt: parent => {
      return moment(parent.createdAt).format('YYYY-MM-DD HH:mm:ss Z');
    },
    updatedAt: parent => {
      return moment(parent.updatedAt).format('YYYY-MM-DD HH:mm:ss Z');
    },
  },
};
