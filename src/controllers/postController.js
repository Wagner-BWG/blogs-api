const { validateInputFields, validateCategory, composeNewPost,
  fetchAllPosts, fetchSinglePost, editPost, searchPosts } = require('../services/postService');

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

const getSinglePost = async (req, res) => {
  const { id } = req.params;
  const { status, json } = await fetchSinglePost(id);
  return res.status(status).json(json);
};

const editUserPost = async (req, res) => {
  const { id: userId } = req.user;
  const { id: postId } = req.params;
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ message: 'Some required fields are missing' });  
  }
  const { json: post } = await fetchSinglePost(postId);
  if (userId === post.userId) {
    await editPost(postId, title, content);
    const { json: editedPost } = await fetchSinglePost(postId);
    return res.status(200).json({ editedPost });
  }
  return res.status(401).json({ message: 'Unauthorized user' });
};

const searchForPost = async (req, res) => {
  const { q } = req.query;
  const query = `%${q}%`;
  const { status, json } = await searchPosts(query);
  return res.status(status).json(json);
};

module.exports = { newPost, getAllPosts, getSinglePost, editUserPost, searchForPost };