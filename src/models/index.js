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
  Commande: sequelize.import('./commande'),
  CommandeHistory: sequelize.import('./commandeHistory'),
  Config: sequelize.import('./config'),
  Price: sequelize.import('./price'),
};

Object.keys(models).forEach((key) => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

Object.keys(models).forEach((key) => {
  if ('addListener' in models[key]) {
    models[key].addListener(models);
  }
});

export { sequelize };

export default models;
