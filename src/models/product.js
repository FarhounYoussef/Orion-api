const product = (sequelize, DataTypes) => {
  const Product = sequelize.define('product', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    currentPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    initialPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    minPrice: {
      type: DataTypes.FLOAT
    },
    maxPrice: {
      type: DataTypes.FLOAT
    }
  });

  Product.associate = models => {
    Product.belongsTo(models.Category, {
      foreignKey: {
        name: 'categoryId',
        allowNull: false
      }
    });
    Product.hasMany(models.ProductHistory, { onDelete: 'CASCADE' });
  };

  Product.addListener = models => {
    Product.afterCreate((product, options) => {
      models.ProductHistory.create({
        productId: product.dataValues.id,
        userId: options.context.user.id,
        log: product.dataValues
      })
    })
    Product.afterUpdate((product, options) => {
      models.ProductHistory.create({
        productId: product.dataValues.id,
        userId: options.context.user.id,
        log: product.dataValues
      })
    })
  };

  return Product;
};

export default product;
