const PostCategory = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define("PostCategory", {
    postId: { type: DataTypes.INTEGER, foreginKey: true },
    categoryId: { type: DataTypes.INTEGER, foreginKey: true },
  });

  PostCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category,
      { foreginKey: 'id', as: 'PostId', through: PostCategory, otherKey: 'postId' });
    models.Category.belongsToMany(models.BlogPost,
      { foreginKey: 'id', as: 'CategoryId', through: PostCategory, otherKey: 'categoryId' });
  };

  return PostCategory;
};

module.exports = PostCategory;