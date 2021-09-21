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
    bottomText: {
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
      values: ['DIGITAL', 'CANVAS', 'FRAME'],
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    size: {
      type: DataTypes.ENUM,
      values: ['1', '1.5', '2'],
      defaultValue: '1',
    },
    borderColor: {
      type: DataTypes.STRING,
      defaultValue: '#CCCCCC',
    },
  });

  return Config;
};
