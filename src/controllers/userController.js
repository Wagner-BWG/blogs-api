const { validateNewUser, fetchAllUsers, fetchSingleUser } = require('../services/userService');

const createUser = async (req, res) => {
  const newUser = req.body;
  const { status, json } = await validateNewUser(newUser);
  return res.status(status).json(json);
};

const listAllUsers = async (_req, res) => {
  const { status, json } = await fetchAllUsers();
  return res.status(status).json(json);
};

const listUniqueUser = async (req, res) => {
  const { id } = req.params;
  const { status, json } = await fetchSingleUser(id);
  return res.status(status).json(json);
};

const deleteUser = async (_req, res) => res.status(200).json({ message: 'delete' });

module.exports = { createUser, listAllUsers, listUniqueUser, deleteUser };