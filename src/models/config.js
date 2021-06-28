export default (sequelize, DataTypes) => {
  const Config = sequelize.define('config', {
    background: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    onWhite: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    withConstellations: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    withGrid: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    withMoon: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    text: {
      type: DataTypes.STRING,
    },
    latitude: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    longitude: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    showTime: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    time: {
      type: DataTypes.STRING,
    },
    layout: {
      type: DataTypes.ENUM,
      values: ['Portrait','Square', 'Landscape'],
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  });

  // Config.associate = models => {
  //   Config.belongsTo(models.Commande, {
  //     foreignKey: {
  //       name: 'commandeId',
  //       allowNull: false
  //     }
  //   });
  // };

  return Config;
};