import { boolean, object, string, TypeOf } from 'zod';

export const createTodoSchema = object({
  body: object({
    title: string({
      required_error: 'Title is required',
    }),
    content: string({
      required_error: 'Content is required',
    }),
    isDone: boolean(),
    categoryId: string()
  }).partial(),
});

const params = {
  params: object({
    todoId: string(),
  }),
};

export const getTodoSchema = object({
  ...params,
});

export const updateTodoSchema = object({
  ...params,
  body: object({
    title: string(),
    content: string(),
    isDone: boolean(),
    categoryId: string()
  }).partial(),
});

export const deleteTodoSchema = object({
  ...params,
});

export type CreateTodoInput = TypeOf<typeof createTodoSchema>['body'];
export type GetTodoInput = TypeOf<typeof getTodoSchema>['params'];
export type UpdateTodoInput = TypeOf<typeof updateTodoSchema>;
export type DeleteTodoInput = TypeOf<typeof deleteTodoSchema>['params'];