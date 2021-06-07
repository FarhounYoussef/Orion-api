const ProductHistory = (sequelize, DataTypes) => {
  const ProductHistory = sequelize.define('productHistory', {
    log: {
      type: DataTypes.JSONB,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    }
  });

  ProductHistory.associate = models => {
    ProductHistory.belongsTo(models.Product, {
      foreignKey: {
        name: 'productId',
        allowNull: false
      }
    });
    ProductHistory.belongsTo(models.User, {
      foreignKey: {
        name: 'userId',
        allowNull: false
      }
    });
  };

  return ProductHistory;
};

export default ProductHistory;
