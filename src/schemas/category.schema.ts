import { boolean, object, string, TypeOf } from 'zod';

export const createCategorySchema = object({
  body: object({
    title: string({
      required_error: 'Title is required',
    }),
    color: string({
      required_error: 'color is required',
    })
  }),
});

const params = {
  params: object({
    categoryId: string(),
  }),
};

export const getCategorySchema = object({
  ...params,
});

export const updateCategorySchema = object({
  ...params,
  body: object({
    title: string(),
    color: string(),
  }).partial(),
});

export const deleteCategorySchema = object({
  ...params,
});

export type CreateCategoryInput = TypeOf<typeof createCategorySchema>['body'];
export type GetCategoryInput = TypeOf<typeof getCategorySchema>['params'];
export type UpdateCategoryInput = TypeOf<typeof updateCategorySchema>;
export type DeleteCategoryInput = TypeOf<typeof deleteCategorySchema>['params'];