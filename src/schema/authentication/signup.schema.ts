import { body, ValidationChain } from 'express-validator';

import { AppDataSource } from '../../data-source';
import { User } from '../../entities';

const schema: ValidationChain[] = [
  body('email')
    .isEmail()
    .withMessage('Email must contain a valid email address')
    .custom(async (value) => {
      const userRepo = AppDataSource.getRepository(User);
      const user = await userRepo.findOneBy({ email: value });
      if (user) {
        throw new Error('Email already exists');
      }
    }),

  body('firstName').not().isEmpty().withMessage('First Name must not be empty'),

  body('lastName').not().isEmpty().withMessage('Last Name must not be empty'),

  body('middleName')
    .not()
    .isEmpty()
    .withMessage('Middle Name must not be empty'),

  body('password')
    .not()
    .isEmpty()
    .withMessage('Password must not be empty')
    .custom((value) => {
      if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/.test(value)) {
        throw new Error(
          'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
        );
      }
      return true;
    }),

  body('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Passwords do not match');
    }
    return true;
  }),
];

export { schema as signupSchema };
