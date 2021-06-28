export default (sequelize, DataTypes) => {
  const CommandeHistory = sequelize.define('commandeHistory', {
    log: {
      type: DataTypes.JSONB,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    }
  });

  CommandeHistory.associate = models => {
    CommandeHistory.belongsTo(models.Commande, {
      foreignKey: {
        name: 'commandeId',
        allowNull: false
      }
    });
    CommandeHistory.belongsTo(models.User, {
      foreignKey: {
        name: 'userId',
        allowNull: false
      }
    });
  };

  return CommandeHistory;
};

