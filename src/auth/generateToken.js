const jwt = require('jsonwebtoken');
// const { User } = require('../database/models');

const generateToken = async (email) => {
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };
  
  const secret = process.env.JWT_SECRET;
  const token = jwt.sign({ data: email }, secret, jwtConfig);
  return token;
};

module.exports = generateToken;