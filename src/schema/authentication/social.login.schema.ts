import { body } from 'express-validator';

const schema = [
  body('email').not().isEmpty().withMessage('Email must not be empty'),
];

export { schema as socialLoginSchema };
