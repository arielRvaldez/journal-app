const jwt = require('jsonwebtoken');

const secret = 'mysecretssshhhhhhh';
const expiration = '2h';

const extractToken = (req) => {
  let token = req.body.token || req.query.token || req.headers.authorization;

  if (req.headers.authorization) {
    token = token.split(' ').pop().trim();
  }

  return token || null; // Return null if no token is found
};

const verifyToken = (token) => {
  try {
    const decodedToken = jwt.verify(token, secret);
    return decodedToken.data; // Return the decoded token data
  } catch (error) {
    // Rethrow the error with additional context if needed
    throw new Error('Invalid token or token expired');
  }
};

const authMiddleware = async ({ req }) => {
  const token = extractToken(req);

  if (!token) {
    return req;
  }

  try {
    const userData = await verifyToken(token);
    req.user = userData;
  } catch (error) {
    console.log(error.message);
    throw new Error('Invalid token', { code: 'UNAUTHENTICATED' });
  }

  return req;
};

const signToken = ({ email, username, _id }) => {
  const payload = { email, username, _id };
  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
};

module.exports = { authMiddleware, signToken };
