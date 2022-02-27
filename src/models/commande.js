import { sendEmail } from '../services/email';
import { getDraftOrderMail, getOrderMail } from '../utils/helpers';

export default (sequelize, DataTypes) => {
  const Commande = sequelize.define('commande', {
    ref: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    isDraft: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    status: {
      type: DataTypes.ENUM,
      values: [
        'PENDING',
        'CANCELED',
        'IN_PROGRESS',
        'IN_PREPARATION',
        'READY_FOR_EXPEDITION',
        'DELIVRED',
      ],
      defaultValue: 'PENDING',
      allowNull: false,
    },
  });

  Commande.associate = (models) => {
    Commande.belongsTo(models.Client, {
      foreignKey: {
        name: 'clientId',
        allowNull: false,
      },
    });
    Commande.belongsTo(models.Config, {
      foreignKey: {
        name: 'configId',
        allowNull: false,
      },
    });
    Commande.hasMany(models.CommandeHistory, { onDelete: 'CASCADE' });
  };

  Commande.addListener = (models) => {
    Commande.afterCreate(async (commande, options) => {
      const mailContent = commande.dataValues.isDraft
        ? await getDraftOrderMail({
            commande: commande.dataValues,
            client: options.context.client,
            preview64: options.context.preview64,
          })
        : await getOrderMail({
            commande: commande.dataValues,
            client: options.context.client,
            preview64: options.context.preview64,
          });
      sendEmail(mailContent);
    });
    Commande.afterUpdate((commande, options) => {
      models.CommandeHistory.create({
        commandeId: commande.dataValues.id,
        userId: options.context.user.id,
        log: commande.dataValues,
      });
    });
  };

  return Commande;
};
