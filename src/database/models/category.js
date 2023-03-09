const Category = (sequelize, DataTypes) => {
  const Category = sequelize.define("Category", {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    name: DataTypes.STRING,
  });

  Category.associate = (models) => {
    Category.hasMany(models.PostCategories,
      { foreignKey: 'id', as: 'categoryId' });
  };

  return Category;
};

module.exports = Category;