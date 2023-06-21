import express from 'express';

import { AuthuserRouter } from './authentication/authentication.router';
import { userRouter } from './user/user.router';

export const public_api = express.Router();
public_api.use('/user', userRouter);
public_api.use('/auth', AuthuserRouter);
