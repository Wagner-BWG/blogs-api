const { validateInputFields } = require('../services/postService');

const newPost = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  if (!validateInputFields(title, content, categoryIds)) {
    return res.status(400).json({
      message: 'Some required fields are missing',
    });
  } return res.status(200).json({ message: 'ok ' });
};

module.exports = { newPost };