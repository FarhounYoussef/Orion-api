const category = (sequelize, DataTypes) => {
  const Category = sequelize.define('category', {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  });
  Category.associate = models => {
    Category.hasMany(models.Product, { onDelete: 'CASCADE' });
  };
  return Category;
};

export default category;
