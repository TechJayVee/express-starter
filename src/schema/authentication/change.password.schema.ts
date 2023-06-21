import { body } from 'express-validator';

const schema = [
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

export { schema as changePasswordSchema };
