import express from "express"
import { validate } from "../middlewares/validate";
import { createCategorySchema, deleteCategorySchema, getCategorySchema } from "../schemas/category.schema";
import { deleteCategoryHandler, getCategoriesHandler, getCategoryHandler, newCategoryHandler } from "../controllers/category.controller";
import { isAuthenticated } from "../middlewares/helper";

const router = express.Router();

router.post('/newcategory', isAuthenticated, validate(createCategorySchema), newCategoryHandler);

router.get('/:categoryId', isAuthenticated, validate(getCategorySchema), getCategoryHandler);

router.get('/',  isAuthenticated, getCategoriesHandler);

router.delete('/:categoryId', isAuthenticated, validate(deleteCategorySchema), deleteCategoryHandler);


export default router;