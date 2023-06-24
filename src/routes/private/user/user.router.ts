import express from 'express';

import { USER_TYPE } from '../../../common';
import { UserController } from '../../../controller';
import { typeCheckerMiddleware, validateUUID } from '../../../middleware';
import { userSchema, validateRequestSchema } from '../../../schema';

export const userRouter = express.Router();

userRouter.get(
  '/users-list',
  typeCheckerMiddleware([USER_TYPE.REGULAR, USER_TYPE.ADMIN]),
  UserController.getAllUser
);
userRouter.get(
  '/user/:id',
  validateUUID,

  UserController.getUserById
);
userRouter.put('/user/:id', validateUUID, UserController.updateUser);
userRouter.delete('/user/:id', validateUUID, UserController.deleteUser);
userRouter.post(
  '/user',
  userSchema,
  validateRequestSchema,
  UserController.registerUser
);
