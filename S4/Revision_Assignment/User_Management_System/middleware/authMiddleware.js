const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ status: 401, message: 'Invalid/Expired Token' });
  }

  jwt.verify(token.split(' ')[1], 'secret', (err, user) => {
    if (err) {
      return res.status(401).json({ status: 401, message: 'Invalid/Expired Token' });
    }

    req.user = user;
    next();
  });
};

module.exports = { authenticateToken };
