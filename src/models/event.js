import schedule from 'node-schedule';
import pubsub, { SUBSCRIPTIONS } from '../subscriptions';

const event = (sequelize, DataTypes) => {
  const Event = sequelize.define('event', {
    duration: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    products: {
      type: DataTypes.JSONB,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    startAt: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    endAt: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  });

  Event.associate = models => {
    Event.belongsTo(models.User, {
      foreignKey: {
        name: 'userId',
        allowNull: false
      }
    });
  };

  Event.addListener = models => {
    Event.afterCreate((event, options) => {
      const { user } = options.context;
      const { startAt, endAt, products } = event;
      const startTime = new Date(startAt);
      const endTime = new Date(endAt);
      const showTime = new Date(startTime.getTime() - 8000)
      // Show
      schedule.scheduleJob(showTime, () => {
        pubsub.publish(SUBSCRIPTIONS.EVENT.SHOW, {
          eventShow: { ...event.dataValues },
        });
      });
      // Start
      schedule.scheduleJob(startTime, () => {
        pubsub.publish(SUBSCRIPTIONS.EVENT.STARTED, {
          eventStarted: { ...event.dataValues },
        });
        products.forEach(async ({ id, price }) => {
          const productInstance = await models.Product.findByPk(id);
          productInstance.update({ currentPrice: price }, { context: { user } });
        })
      });
      // END
      schedule.scheduleJob(endTime, () => {
        products.forEach(async ({ id }) => {
          const productInstance = await models.Product.findByPk(id);
          const { initialPrice } = productInstance.dataValues;
          productInstance.update({ currentPrice: initialPrice }, { context: { user } });
        })
      });
    })
  };

  return Event;
};

export default event;
