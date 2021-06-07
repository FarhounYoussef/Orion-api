import Sequelize from 'sequelize';

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    dialect: 'postgres',
  },
);

const models = {
  User: sequelize.import('./user'),
  Category: sequelize.import('./category'),
  Product: sequelize.import('./product'),
  ProductHistory: sequelize.import('./productHistory'),
  Event: sequelize.import('./event'),
};

Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

Object.keys(models).forEach(key => {
  if ('addListener' in models[key]) {
    models[key].addListener(models);
  }
});

export { sequelize };

export default models;