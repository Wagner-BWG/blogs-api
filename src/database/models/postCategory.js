const PostCategory = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define("PostCategory", {
    postId: { type: DataTypes.INTEGER, foreginKey: true },
    categoryId: { type: DataTypes.INTEGER, foreginKey: true },
  });

  PostCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category,
      { foreginKey: 'categoryId', as: 'categories', through: 'BlogPost_Category', otherKey: 'postId' });
      // { foreginKey: 'categoryId', as: 'PostId', through: 'Category_Post', otherKey: 'postId' });
    models.Category.belongsToMany(models.BlogPost,
      { foreginKey: 'postId', as: 'CategoryId', through: 'Post_Category', otherKey: 'categoryId' });
  };

  return PostCategory;
};

module.exports = PostCategory;