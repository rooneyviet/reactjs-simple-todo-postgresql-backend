import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';
import responseHandler from '../handlers/response.handler';

export const validate =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        params: req.params,
        query: req.query,
        body: req.body,
      });

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return responseHandler.badRequest(res, JSON.stringify(error.errors));
      }
      responseHandler.badRequest(res, JSON.stringify(error));
    }
  };