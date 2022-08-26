const Category = (sequelize, DataTypes) => {
  const Category = sequelize.define("Category", {
    name: DataTypes.STRING,
  });

  Category.associate = (models) => {
    Category.hasMany(models.PostCategory,
      { foreignKey: 'id', as: 'categoryId' });
  };

  return Category;
};

module.exports = Category;