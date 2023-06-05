import { NextFunction, Request, Response } from "express";
import {
  CreateTodoInput,
  GetTodoInput,
  UpdateTodoInput,
  DeleteTodoInput,
} from "../schemas/todo.schema";
import { findUserById } from "../services/user.service";
import { AppDataSource } from "../utils/data-source";
import { User } from "../entities/user.entity";
import { Todo } from "../entities/todo.entity";
import { Category } from "../entities/category.entity";
import responseHandler from "../handlers/response.handler";

export const createTodoHandler = async (
  req: Request<{}, {}, CreateTodoInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, content, isDone, categoryId } = req.body;

    const user = res.locals.user as User;

    const categoryRepository = AppDataSource.getRepository(Category);

    const findCategory = await categoryRepository.findOneBy({ id: categoryId });

    const todoRepository = AppDataSource.getRepository(Todo);

    const newTodo = await todoRepository.save(
      todoRepository.create({
        title: title,
        content: content,
        isDone,
        user: user,
        category: findCategory || undefined,
      })
    );
    responseHandler.created(res, newTodo);
  } catch (err: any) {
    console.log(err);
    responseHandler.error(err);
  }
};


export const getTodoHandler = async (
  req: Request<GetTodoInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const todoRepository = AppDataSource.getRepository(Todo);
    const posts = await todoRepository.find({
      where: { id: req.params.todoId },
      relations: ["user", "category"],
    });

    const post = posts[0];

    if (!post) {
      return responseHandler.notfound(res);
    }

    responseHandler.ok(res, post);
  } catch (err: any) {
    //next(err);
    console.log(err);
    responseHandler.error(err);
  }
};



export const getTodosHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //const posts = await findTodos({}, {}, {});

    const user = res.locals.user as User;

    const todoRepository = AppDataSource.getRepository(Todo);
    const findTodos = await todoRepository.find({
      where: { userId: user.id },
      relations: ["user", "category"],
    });

    //const user = await userRepository.find({where: {id: user.id}, relations: ["todos"]})
    responseHandler.ok(res, findTodos);
  } catch (err: any) {
    console.log(err);
    responseHandler.error(err);
  }
};


export const getTodosByCategoryHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //const posts = await findTodos({}, {}, {});
    const categoryId = req.params.categoryId;

    const todoRepository = AppDataSource.getRepository(Todo);

    const user = res.locals.user as User;

    const findTodos = await todoRepository.find({
      where: { userId: user.id, categoryId: categoryId },
      relations: ["user", "category"],
    });

    responseHandler.ok(res, findTodos);
  } catch (err: any) {
    console.log(err);
    responseHandler.error(err);
  }
};


export const updateTodoHandler = async (
  req: Request<UpdateTodoInput["params"], {}, UpdateTodoInput["body"]>,
  res: Response,
  next: NextFunction
) => {
  try {
    const todoRepository = AppDataSource.getRepository(Todo);

    const todoList = await todoRepository.find({ where: {id: req.params.todoId}, relations: ["user", "category"]});
    const todo = todoList[0];

  
    if (!todo) {
      return responseHandler.notfound(res);
    }

    Object.assign(todo, req.body);

    const updatedPost = await todo.save();

    responseHandler.ok(res, updatedPost);
  } catch (err: any) {
    console.log(err);
    responseHandler.error(err);
  }
};


export const deleteTodoHandler = async (
  req: Request<DeleteTodoInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const todoRepository = AppDataSource.getRepository(Todo);
    const todo = await todoRepository.findOneBy({ id: req.params.todoId });

    if (!todo) {
      return responseHandler.notfound(res);
    }

    await todoRepository.delete({ id: req.params.todoId });

    responseHandler.ok(res);
  } catch (err: any) {
    console.log(err);
    responseHandler.error(err);
  }
};
