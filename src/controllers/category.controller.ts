import {
  CreateCategoryInput,
  DeleteCategoryInput,
  GetCategoryInput,
} from "../schemas/category.schema";
import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../utils/data-source";
import { Category } from "../entities/category.entity";
import { User } from "../entities/user.entity";
import responseHandler from "../handlers/response.handler";

export const newCategoryHandler = async (
  req: Request<CreateCategoryInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, color } = req.body;
    const categoryRepository = AppDataSource.getRepository(Category);

    const user = res.locals.user;

    const newCategory = await categoryRepository.save(
      categoryRepository.create({
        title: title,
        color: color,
        user: user,
      })
    );
    responseHandler.ok(res, newCategory);
  } catch (err: any) {
    console.log(err);
    responseHandler.error(err);
  }
};

export const getCategoriesHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categoryRepository = AppDataSource.getRepository(Category);

    const user = res.locals.user as User;

    const listCategories = await categoryRepository.find({
      where: { userId: user.id },
      relations: ["todos", "user"],
    });
    responseHandler.ok(res, listCategories);
  } catch (err: any) {
    console.log(err);
    responseHandler.error(err);
  }
};

export const getCategoryHandler = async (
  req: Request<GetCategoryInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const categoryId = req.params.categoryId;
    const categoryRepository = AppDataSource.getRepository(Category);

    const findCategory = await categoryRepository.findOneBy({ id: categoryId });
    if (!findCategory) {
      return responseHandler.notfound(res);
    }
    responseHandler.ok(res, findCategory);
  } catch (err: any) {
    console.log(err);
    responseHandler.error(err);
  }
};

export const deleteCategoryHandler = async (
  req: Request<DeleteCategoryInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const categoryId = req.params.categoryId;

    const categoryRepository = AppDataSource.getRepository(Category);

    await categoryRepository.delete({ id: categoryId });

    responseHandler.ok(res, {
      message: "Delete successfully",
    });
  } catch (err: any) {
    console.log(err);
    responseHandler.error(err);
  }
};
