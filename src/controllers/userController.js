const { validateNewUser } = require('../services/userService');

const createUser = async (req, res) => {
  const newUser = req.body;
  const { status, json } = await validateNewUser(newUser);
  return res.status(status).json(json);
};

const deleteUser = async (req, res) => res.status(200).json({ message: 'delete' });

module.exports = { createUser, deleteUser };