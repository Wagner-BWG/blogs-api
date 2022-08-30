const { writeNewCategory } = require('../services/categoryService');

const createCategory = async (req, res) => {
  const { name } = req.body;
  const { status, json } = await writeNewCategory(name);
  return res.status(status).json(json);
};

module.exports = { createCategory };