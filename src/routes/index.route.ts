import authRoute from "./auth.route"
import userRoute from "./user.route"
import todoRoute from "./todo.routes"
import categoryRoute from "./category.route"
import express from "express"
const router = express.Router();


router.use("/auth", authRoute);
router.use("/categories", categoryRoute);
router.use("/todos", todoRoute);


export default router;