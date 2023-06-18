import express from 'express';

import { userRouter } from './user/user.router';

export const public_api = express.Router();

public_api.use('/user', userRouter);
