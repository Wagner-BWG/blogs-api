const { writeNewCategory, listAllCategories } = require('../services/categoryService');

const createCategory = async (req, res) => {
  const { name } = req.body;
  const { status, json } = await writeNewCategory(name);
  return res.status(status).json(json);
};

const getAllCategories = async (req, res) => {
  const { status, json } = await listAllCategories();
  return res.status(status).json(json);
};

module.exports = { createCategory, getAllCategories };