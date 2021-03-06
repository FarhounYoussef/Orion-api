import {
  AuthenticationError,
  ForbiddenError,
  UserInputError,
} from 'apollo-server';
import jwt from 'jsonwebtoken';
import moment from 'moment';

const createToken = async (user, secret) => {
  const { id, username, role } = user;
  return await jwt.sign({ id, username, role }, secret);
};

export default {
  Query: {
    users: (_parent, { where }, { models, user }) => {
      if (!user) {
        throw new ForbiddenError('Not authenticated as user.');
      }
      return models.User.findAll({ where });
    },
    user: (_parent, { id }, { models, user }) => {
      if (!user) {
        throw new ForbiddenError('Not authenticated as user.');
      }
      return models.User.findByPk(id);
    },
  },
  Mutation: {
    createUser: (_parent, { data }, { models, user }) => {
      if (!user) {
        throw new ForbiddenError('Not authenticated as user.');
      }
      return models.User.create(data);
    },
    updateUser: async (_parent, { id, data }, { models, user }) => {
      if (!user) {
        throw new ForbiddenError('Not authenticated as user.');
      }
      const userInstance = await models.User.findByPk(id);
      return userInstance.update(data, { context: { user } });
    },
    deleteUser: async (_parent, { id }, { models, user }) => {
      if (!user) {
        throw new ForbiddenError('Not authenticated as user.');
      }
      await models.User.destroy({ where: { id } });
      return { id };
    },
    signIn: async (
      _parent,
      { email, password },
      { models, secret },
    ) => {
      const user = await models.User.findOne({
        where: { email },
      });

      if (!user) {
        throw new UserInputError(
          'No user found with this login credentials.',
        );
      }
      const isValid = await user.validatePassword(password);
      if (!isValid) {
        throw new AuthenticationError('Invalid password.');
      }
      const token = createToken(user, secret);
      const { password: toRemove, ...rest } = user.dataValues;
      return { token, user: rest };
    },
  },
  User: {
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
