import moment from 'moment';
import Sequelize from 'sequelize';
import { ForbiddenError } from 'apollo-server';
import pubsub, { SUBSCRIPTIONS } from '../subscriptions';

const Op = Sequelize.Op

export default {
  Query: {
    events: (parent, { where }, { models, user }) => {
      if (!user) {
        throw new ForbiddenError('Not authenticated as user.');
      }
      return models.Event.findAll({ where });
    },
    event: (parent, { id }, { models, user }) => {
      if (!user) {
        throw new ForbiddenError('Not authenticated as user.');
      }
      return models.Event.findByPk(id);
    },
    currentEvent: (parent, {}, { models, user }) => {
      if (!user) {
        throw new ForbiddenError('Not authenticated as user.');
      }
      return models.Event.findOne({
        where: {
          startAt: {
            [Op.lt]: moment().toDate(),
          },
          endAt: {
            [Op.gt]: moment().toDate(),
          },
        },
      });
    },
  },
  Mutation: {
    createEvent: (parent, { data: objectData }, { models, user }) => {
      if (!user) {
        throw new ForbiddenError('Not authenticated as user.');
      }
      const data = JSON.parse(JSON.stringify(objectData));
      data.userId = user.id;
      data.endAt = moment(new Date(data.startAt))
        .add(data.duration, 's')
        .format();
      return models.Event.create(data, { context: { user } });
    },
    updateEvent: async (parent, { id, data }, { models, user }) => {
      if (!user) {
        throw new ForbiddenError('Not authenticated as user.');
      }
      const eventInstance = await models.Event.findByPk(id);
      return eventInstance.update(data, { context: { user } });
    },
    deleteEvent: async (parent, { id }, { models, user }) => {
      if (!user) {
        throw new ForbiddenError('Not authenticated as user.');
      }
      await models.Event.destroy(
        { where: { id } },
        { context: { user } },
      );
      return { id };
    },
  },
  Subscription: {
    eventShow: {
      subscribe: () =>
        pubsub.asyncIterator(SUBSCRIPTIONS.EVENT.SHOW),
    },
    eventStarted: {
      subscribe: () =>
        pubsub.asyncIterator(SUBSCRIPTIONS.EVENT.STARTED),
    },
  },
  Event: {
    currentDate: () => {
      return moment().format('YYYY-MM-DD HH:mm:ss Z');
    },
    startAt: parent => {
      return moment(parent.startAt).format('YYYY-MM-DD HH:mm:ss Z');
    },
    endAt: parent => {
      return moment(parent.endAt).format('YYYY-MM-DD HH:mm:ss Z');
    },
    createdAt: parent => {
      return moment(parent.createdAt).format('YYYY-MM-DD HH:mm:ss Z');
    },
    updatedAt: parent => {
      return moment(parent.updatedAt).format('YYYY-MM-DD HH:mm:ss Z');
    },
    user: (parent, args, { models }) => {
      return models.User.findByPk(parent.userId);
    },
  },
};
