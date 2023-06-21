import express from 'express';

import { validateJWT } from '../../middleware';

import { AuthuserRouter } from './authentication/authentication.router';
import { userRouter } from './user/user.router';

export const private_api = express.Router();

private_api.use(validateJWT);
private_api.use('/auth', AuthuserRouter);
private_api.use('/user', userRouter);
