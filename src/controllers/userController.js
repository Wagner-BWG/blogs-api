const { validateNewUser, listAllUsers } = require('../services/userService');

const createUser = async (req, res) => {
  const newUser = req.body;
  const { status, json } = await validateNewUser(newUser);
  return res.status(status).json(json);
};

const fetchAllUsers = async (_req, res) => {
  console.log('chegou aqui');
  const { status, json } = await listAllUsers();
  return res.status(status).json(json);
};

const deleteUser = async (_req, res) => res.status(200).json({ message: 'delete' });

module.exports = { createUser, fetchAllUsers, deleteUser };