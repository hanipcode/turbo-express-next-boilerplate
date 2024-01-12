import { Router } from "express";
import { login } from "./routes/login";

const userRouter = Router();

userRouter.post("/login", login);

export default userRouter;
