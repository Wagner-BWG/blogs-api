const jwt = require('jsonwebtoken');
const emailValidator = require('email-validator');
const { User } = require('../database/models');

const createUser = async (newUser) => {
  await User.create(newUser);
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  const { email } = newUser;
  const secret = process.env.JWT_SECRET;
  const token = jwt.sign({ data: email }, secret, jwtConfig);
  return { status: 201, json: { token } };
};

const checkExistingUsers = async (newUser) => {
  const { email } = newUser;
  const check = await User.findAll({
    where: {
      email,
    },
  });

  if (check.length === 0) {
    const response = await createUser(newUser);
    return response;
  }
  return {
    status: 409,
    json: {
      message: 'User already registered',
    },
  };
};

const validatePassword = async (newUser) => {
  const { password } = newUser;
  if (password.length < 6) {
    return {
      status: 400,
      json: { message: '"password" length must be at least 6 characters long' },
    };
  }
  const response = await checkExistingUsers(newUser);
  return response;
};

const validateEmail = (newUser) => {
  const { email } = newUser;
  if (!emailValidator.validate(email)) {
    return {
      status: 400,
      json: { message: '"email" must be a valid email' },
    };
  } return validatePassword(newUser);
};

const validateDisplayName = (newUser) => {
  const { displayName } = newUser;
  if (displayName.length < 8) {
    return {
      status: 400,
      json: { message: '"displayName" length must be at least 8 characters long' },
    };
  } return validateEmail(newUser);
};

const validateNewUser = async (newUser) => {
  const response = validateDisplayName(newUser);
  return response;
};

module.exports = { validateNewUser };