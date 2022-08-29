const jwt = require('jsonwebtoken');
const { User } = require('../database/models');

const secret = process.env.JWT_SECRET;

const validateToken = async (req, res, next) => {
  const token = req.headers.authorization;
  console.log(token);

  if (token === undefined || token.length === 0) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const decoded = jwt.verify(token, secret);
    const user = await User.findOne({ where: { email: decoded.data } });

    if (!user) {
      return res
        .status(401)
        .json({ message: 'Erro ao procurar usuário do token.' });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = validateToken;