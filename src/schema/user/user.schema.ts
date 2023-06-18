import { body } from 'express-validator';

import { AppDataSource } from '../../data-source';
import { User } from '../../entities';

const schema = [
  body('email')
    .isEmail()
    .withMessage('Email must contain a valid email address')
    .custom(async (value) => {
      const userRepo = AppDataSource.getRepository(User);
      const user = await userRepo.findOneBy({ email: value });
      if (user) {
        throw new Error('email already exists');
      }
    }),

  body('firstName').not().isEmpty().withMessage('First Name must not be empty'),

  body('lastName').not().isEmpty().withMessage('Last Name must not be empty'),
  body('middleName')
    .not()
    .isEmpty()
    .withMessage('Middle Name must not be empty'),
];

export { schema as userSchema };
