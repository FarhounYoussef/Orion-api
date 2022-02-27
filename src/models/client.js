const client = (sequelize, DataTypes) => {
  const Client = sequelize.define('client', {
    firstname: {
      type: DataTypes.STRING,
    },
    lastname: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    address: {
      type: DataTypes.STRING,
    },
  });

  Client.associate = (models) => {
    Client.hasMany(models.Commande);
  };

  return Client;
};

export default client;
