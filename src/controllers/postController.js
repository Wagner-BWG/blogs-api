const { validateInputFields,
  validateCategory, composeNewPost, fetchAllPosts } = require('../services/postService');

const newPost = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { user } = req;
  if (!validateInputFields(title, content, categoryIds)) {
    return res.status(400).json({
      message: 'Some required fields are missing',
    });
  }
  const categoryIsValid = await validateCategory(categoryIds);
  if (!categoryIsValid) {
    return res.status(400).json({
      message: '"categoryIds" not found',
    });
  }
  const { status, json } = await composeNewPost(user, title, content, categoryIds);
  
  return res.status(status).json(json);
};

const getAllPosts = async (req, res) => {
  const json = await fetchAllPosts();
  return res.status(200).json(json);
};

module.exports = { newPost, getAllPosts };