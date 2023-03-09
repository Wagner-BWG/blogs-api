const PostCategories = (sequelize, DataTypes) => {
  const PostCategories = sequelize.define('PostCategories', {
    postId: { type: DataTypes.INTEGER, foreginKey: true },
    categoryId: { type: DataTypes.INTEGER, foreginKey: true },
  });

  PostCategories.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category,
      { foreginKey: 'categoryId', as: 'categories', through: 'PostCategories', otherKey: 'postId' });
    models.Category.belongsToMany(models.BlogPost,
      { foreginKey: 'id', as: 'postId', through: 'PostCategories', otherKey: 'categoryId' });
  };

  return PostCategories;
};

module.exports = PostCategories;