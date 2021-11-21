import moment from 'moment';
import { sendEmail } from '../services/email';

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
    Commande.afterCreate((commande, options) => {
      sendEmail({
        templateId: 1,
        to: [
          {
            email: options.context.client.email,
            fullname: `${options.context.client.firstname} ${options.context.client.lastname}`,
          },
        ],
        subject: 'Orion: YOUR NIGHT SKY',
        params: {
          NOM: options.context.client.firstname,
          PRENOM: options.context.client.lastname,
          TIME_LIMIT: '15',
          TOTAL_PRICE: commande.dataValues.price,
          ORDER_NUM: commande.dataValues.ref,
          ORDER_DATE: moment(commande.dataValues.createdAt).format(
            'YYYY-MM-DD',
          ),
          IMAGE_PREVIEW: options.context.preview64,
        },
      });
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
