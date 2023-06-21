import express from 'express';

import { UserController } from '../../../controller';
import { validateUUID } from '../../../middleware';
import { userSchema, validateRequestSchema } from '../../../schema';

export const userRouter = express.Router();

userRouter.get('/users-list', UserController.getAllUser);
userRouter.get('/user/:id', validateUUID, UserController.getUserById);
userRouter.put('/user/:id', validateUUID, UserController.updateUser);
userRouter.delete('/user/:id', validateUUID, UserController.deleteUser);
userRouter.post(
  '/user',
  userSchema,
  validateRequestSchema,
  UserController.registerUser
);
