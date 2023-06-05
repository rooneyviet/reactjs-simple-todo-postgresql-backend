import express from "express";
import { isAuthenticated } from "../middlewares/helper";
import { validate } from "../middlewares/validate";
import {
  createTodoSchema,
  deleteTodoSchema,
  getTodoSchema,
  updateTodoSchema,
} from "../schemas/todo.schema";
import {
  createTodoHandler,
  deleteTodoHandler,
  getTodoHandler,
  getTodosHandler,
  updateTodoHandler,
} from "../controllers/todo.controller";

const router = express.Router();

router.post(
  "/newtodo",
  isAuthenticated,
  validate(createTodoSchema),
  createTodoHandler
);

router.get(
  "/:todoId",
  isAuthenticated,
  validate(getTodoSchema),
  getTodoHandler
);

router.get("/", isAuthenticated, getTodosHandler);

router.patch(
  "/:todoId",
  isAuthenticated,
  validate(updateTodoSchema),
  updateTodoHandler
);

router.delete(
  "/:todoId",
  isAuthenticated,
  validate(deleteTodoSchema),
  deleteTodoHandler
);

export default router;
