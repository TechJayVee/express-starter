import { body } from 'express-validator';

const schema = [
  body('email').not().isEmpty().withMessage('Email must not be empty'),
  body('password').not().isEmpty().withMessage('Password must not be empty'),
];

export { schema as loginSchema };
