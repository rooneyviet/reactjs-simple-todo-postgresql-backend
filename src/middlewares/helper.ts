import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../utils/data-source";
import { User } from "../entities/user.entity";

type TokenPayload = {
  username: string;
};

export const verifyRefresh = async (username: string, token: string) => {
  try {
    if (username && token) {
      console.log("asfksdklghj");
      const decoded = jwt.verify(token, "refreshSecret") as TokenPayload;
      return decoded.username === username;
    }
    return false;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let token = req.get("Authorization");
    if (!token) {
      return res.status(404).json({ success: false, msg: "Token not found" });
    }
    token = token.split(" ")[1];
    const decoded = jwt.verify(token, "accessSecret") as TokenPayload;
    const userRepository = AppDataSource.getRepository(User);

    const findUser = await userRepository.findOneBy({
      username: decoded.username,
    });

    res.locals.user = findUser;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ success: false, msg: "Something very wrong with your authentication checking method" });
    //return false
  }
};

export const signTokens = async (user: User) => {
  const accessToken = jwt.sign({ username: user.username }, "accessSecret", {
    expiresIn: "7d",
  });

  const refreshToken = jwt.sign({ username: user.username }, "refreshSecret", {
    expiresIn: "30d",
  });

  return { accessToken, refreshToken };
};

export const refreshAccessToken = async (user: User) => {
  const accessToken = jwt.sign({ username: user.username }, "accessSecret", {
    expiresIn: "7d",
  });

  return { accessToken };
};

//export default {verifyRefresh, isAuthenticated}
