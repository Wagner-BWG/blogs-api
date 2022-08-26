const User = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  });

  User.associate = (models) => {
    User.hasMany(models.BlogPosts,
      { foreignKey: 'id', as: 'blogposts' });
  };

  return User;
};

module.exports = User;