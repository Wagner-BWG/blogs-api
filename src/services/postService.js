const { Op } = require('sequelize');
const { BlogPost, Category, PostCategory, User } = require('../database/models');

const validateInputFields = (title, content, categoryIds) => {
  const tests = [title, content, categoryIds];
  let testResult = true;
  tests.forEach((test) => {
    if (!test) testResult = false;
  });
  return testResult;
};

const validateCategory = async (categoryIds) => {
  const category = await Category.findAll({ where: { id: categoryIds } });
  if (category.length !== categoryIds.length) return false;
  return true;
};

const composeNewPost = async (user, title, content, categoryIds) => {
  const newPost = await BlogPost.create({ userId: user.id, title, content });
  console.log(typeof categoryIds);
  categoryIds.forEach(async (ctgId) => {
    await PostCategory.create(
      { postId: newPost.id, categoryId: ctgId }, { fields: ['postId', 'categoryId'] },
    );
  });
  return { status: 201, json: newPost };
};

const fetchAllPosts = async () => {
  const allPosts = await BlogPost.findAll({
    attributes: ['id', 'title', 'content', 'userId', 'published', 'updated'],
    include: [
      {
        model: User,
        as: 'user',
        attributes: ['id', 'displayName', 'email', 'image'],
      },
    ],
  });
  return allPosts;
};

const fetchSinglePost = async (id) => {
  const post = await BlogPost.findOne({
    where: { id },
    attributes: ['id', 'title', 'content', 'userId', 'published', 'updated'],
    include: [
      {
        model: User,
        as: 'user',
        attributes: ['id', 'displayName', 'email', 'image'],
      },
    ],
  });
  if (!post) {
    return { status: 404, json: { message: 'Post does not exist' },
    };
  }
  return { status: 200, json: post };
};

const editPost = async (id, title, content) => {
  await BlogPost.update({
    title, content,
  }, {
    where: { id },
  });
};

const searchPosts = async (query) => {
  const posts = await BlogPost.findAll({
    where: {
      [Op.or]: [{ title: { [Op.like]: query } }, { content: { [Op.like]: query } }],
    },
  });
  return { status: 200, json: posts };
};

module.exports = {
  validateInputFields,
  validateCategory,
  composeNewPost,
  fetchAllPosts,
  fetchSinglePost,
  editPost,
  searchPosts,
};