module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('PostCategory',
      [
        {
          postId: 1,
          categoryId: 1,
        },
        {
          postId: 2,
          categoryId: 2,
        },

      ], { timestamps: false });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('PostCategory', null, {});
  },
};
