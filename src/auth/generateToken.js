const jwt = require('jsonwebtoken');
const { User } = require('../database/models');

const generateToken = async (newUser) => {
  await User.create(newUser);
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };
  
  const { email } = newUser;
  const secret = process.env.JWT_SECRET;
  const token = jwt.sign({ data: email }, secret, jwtConfig);
  return token;
};

module.exports = generateToken;