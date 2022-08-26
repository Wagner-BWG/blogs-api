const PostCategory = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define("PostCategory", {
    postId: { type: DataTypes.INTEGER, foreginKey: true },
    categoryId: { type: DataTypes.INTEGER, foreginKey: true },
  });

  PostCategory.associate = (models) => {
    PostCategory.belongsTo(models.BlogPost,
      { foreginKey: 'id', as: 'postId' });
    PostCategory.belongsTo(models.Category,
      { foreginKey: 'id', as: 'categoryId' });
  };

  return PostCategory;
};

module.exports = PostCategory;