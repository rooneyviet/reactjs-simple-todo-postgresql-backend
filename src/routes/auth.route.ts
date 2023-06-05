import express from "express"
import { validate } from "../middlewares/validate";
import { createUserSchema, loginUserSchema } from "../schemas/user.schema";
import { postLoginHandler, postSignupHandler, refreshAccessTokenHandler } from "../controllers/auth.controller";

const router = express.Router();


router.post('/register', validate(createUserSchema), postSignupHandler);


router.post('/login', validate(loginUserSchema), postLoginHandler);


router.post('/refresh', refreshAccessTokenHandler);



export default router;