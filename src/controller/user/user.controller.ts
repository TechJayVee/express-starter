import { NextFunction, Request, Response } from 'express';

import { userRepository } from '../../providers';
import { CustomError, errorHandlerWrapper } from '../../utils';

export class UserController {
  static getAllUser = errorHandlerWrapper(
    async (req: Request, res: Response) => {
      const users = await userRepository.index();
      res.json(users);
    }
  );

  static getUserById = errorHandlerWrapper(
    async (req: Request, res: Response, next: NextFunction) => {
      const userId = req.params.id;
      const user = await userRepository.show({ userUuid: userId });
      if (!user) {
        const error = new CustomError('User with that Id is not found', 404);
        return next(error);
      }
      res.send(user);
    }
  );

  static updateUser = errorHandlerWrapper(
    async (req: Request, res: Response, next: NextFunction) => {
      const id = req.params.id;
      const user = await userRepository.show({ userUuid: id });
      if (!user) {
        const error = new CustomError(
          'User with that Id is not Available',
          404
        );
        return next(error);
      }
      const results = await userRepository.update(user, req.body);
      res.send(results);
    }
  );
  static deleteUser = errorHandlerWrapper(
    async (req: Request, res: Response, next: NextFunction) => {
      const id = String(req.params.id);
      const user = await userRepository.show({ userUuid: id });
      if (!user) {
        const error = new CustomError(
          'User with that Id is not Available',
          404
        );
        return next(error);
      }
      await userRepository.delete(user.id);
      res.json({
        message: 'User successfully deleted',
      });
    }
  );

  static registerUser = errorHandlerWrapper(
    async (req: Request, res: Response) => {
      const user = await userRepository.save(req.body);
      return res.send(user);
    }
  );
}
