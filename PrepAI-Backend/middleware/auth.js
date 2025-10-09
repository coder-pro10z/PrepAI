const joi = require('joi');
const jwt = require('jsonwebtoken');

const loginValidation = (req, res, next) => {

  const schema = joi.object({
    email: joi.string().email().trim().required(),
    password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).trim().required()
  })
  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Bad Request", error: error });
  }
  req.body = value;
  next();

}


const signUpValidation = (req, res, next) => {

  const schema = joi.object({
    name: joi.string().min(3).max(30).required(),
    email: joi.string().email().trim().required(),
    password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).trim().required(),
  })

  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Bad Request", error: error });
  }
  req.body = value;
  next();
}

const validateToken = (req, res, next) => {

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized', error: 'Access Denied. Token not provided' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized', error: 'Invalid Token' });
  }

}

module.exports = { validateToken, loginValidation, signUpValidation }