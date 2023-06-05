import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { CreateUserInput, LoginUserInput } from "../schemas/user.schema";
import bcrypt from "bcryptjs";
import { User } from "../entities/user.entity";
import { AppDataSource } from "../utils/data-source";
import {
  refreshAccessToken,
  signTokens,
  verifyRefresh,
} from "../middlewares/helper";
import responseHandler from "../handlers/response.handler";

export const postLoginHandler = async (
  req: Request<LoginUserInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password } = req.body;
    const userRepository = AppDataSource.getRepository(User);

    const findUser = await userRepository.findOneBy({ username: username });

    if (!findUser) {
      return responseHandler.badRequest(res, "Invalid username or password");
    }

    if (!(await User.comparePasswords(password, findUser?.password || ""))) {
      return responseHandler.badRequest(res, "Invalid username or password");
    }

    const { accessToken, refreshToken } = await signTokens(findUser);

    responseHandler.ok(res, {
      accessToken,
      refreshToken,
      user: findUser,
    });
  } catch (err: any) {
    console.log(err);
    responseHandler.error(err);
  }
};

export const postSignupHandler = async (
  req: Request<CreateUserInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password } = req.body;
    const userRepository = AppDataSource.getRepository(User);

    const findUser = await userRepository.findOneBy({ username });

    if (findUser) {
      return res.status(400).json({
        status: "error",
        message:
          "This username already exist. Please try again with different username",
      });
    }

    const newUser = await userRepository.save(
      userRepository.create({ username, password })
    );

    const { accessToken, refreshToken } = await signTokens(newUser);

    responseHandler.ok(res, {
      accessToken,
      refreshToken,
      user: {
        newUser,
      },
    });
  } catch (err: any) {
    console.log(err);
    responseHandler.error(err);
  }
};
//

export const refreshAccessTokenHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { refreshToken, username } = req.body;

    const userRepository = AppDataSource.getRepository(User);
    const findUser = await userRepository.findOneBy({ username });

    if (!findUser) {
      return responseHandler.badRequest(res, "Invalid username or password1");
    }

    const isValid = await verifyRefresh(username, refreshToken);

    if (!isValid) {
      return responseHandler.unauthorized(res);
    }

    const { accessToken } = await refreshAccessToken(findUser);

    res.status(200).json({
      status: "success",
      data: {
        success: true,
        accessToken,
      },
    });
  } catch (err: any) {
    console.log(err);
    responseHandler.error(err);
  }
};
