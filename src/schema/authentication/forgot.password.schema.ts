import { body } from 'express-validator';

const schema = [
  body('email')
    .isEmail()
    .withMessage('Email must contain a valid email address'),
];

export { schema as forgotPasswordSchema };
