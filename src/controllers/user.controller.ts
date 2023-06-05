import { NextFunction, Request, Response } from 'express';
import { User } from '../entities/user.entity';
import responseHandler from '../handlers/response.handler';
import { AppDataSource } from '../utils/data-source';

export const getMeHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = res.locals.user as User;

    const userRepository = AppDataSource.getRepository(User);

    const findTodos = await userRepository.find({
      where: { id: user.id },
      relations: ["todos", "categories"],
    });

    responseHandler.ok(res, findTodos[0])
  } catch (err: any) {
    console.log(err);
    responseHandler.error(err);
  }
};