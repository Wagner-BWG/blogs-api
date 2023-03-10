const { Category } = require('../database/models');

const writeNewCategory = async (name) => {
  if (!name) return { status: 400, json: { message: '"name" is required' } };
  
  await Category.create({ name });
  const categoryList = await Category.findAll();
  return { status: 201, json: { id: categoryList.length, name } };
};

const listAllCategories = async () => {
  const categoryList = await Category.findAll();
  return { status: 200, json: categoryList };
};

module.exports = { writeNewCategory, listAllCategories };