import emailService from '../services/email';
import template from '../services/templates/exemple';

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
      ],
      defaultValue: 'PENDING',
      allowNull: false,
    },
  });

  Commande.associate = (models) => {
    Commande.belongsTo(models.User, {
      foreignKey: {
        name: 'userId',
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
      console.log('1', commande.dataValues);
      console.log('2', options.context);
      const message = {
        from: 'orion@contan.com',
        to: options.context.user.email,
        subject: 'Orion: YOUR NIGHT SKY',
        html: template,
      };
      console.log('message', message);
      emailService.sendMail(message, function (err, info) {
        if (err) {
          console.log(err);
        } else {
          console.log(info);
        }
      });
      // models.CommandeHistory.create({
      //   commandeId: commande.dataValues.id,
      //   userId: options.context.user.id,
      //   log: commande.dataValues,
      // });
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
