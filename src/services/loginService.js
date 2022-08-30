// const jwt = require('jsonwebtoken');
const { User } = require('../database/models');
const generateToken = require('../auth/generateToken');

// const secret = process.env.JWT_SECRET;

const findUser = async (email) => {
  const response = await User.findAll({
    where: {
      email,
    },
  });
  return response;
};

const login = async (email, password) => {
  if (!email || !password) {
    return { status: 400, json: { message: 'Some required fields are missing' } };
  }
  const response = await findUser(email);

  if (response.length === 0) return { status: 400, json: { message: 'Invalid fields' } };

  const data = response[0].dataValues;
  if (data.password !== password) {
    return { status: 400, json: { message: 'Invalid fields' } };
  }

  const token = await generateToken(email);

  // const jwtConfig = {
  //   expiresIn: '7d',
  //   algorithm: 'HS256',
  // };

  // const token = jwt.sign({ data: email }, secret, jwtConfig);
  
  return { status: 200, json: { token } };
};

module.exports = login;