export default (sequelize, DataTypes) => {
  const Price = sequelize.define('price', {
    price: {
      type: DataTypes.FLOAT,
      allowNull: true,
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
  });

  return Price;
};
