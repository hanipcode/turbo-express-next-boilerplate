import { Router } from "express";
import { login } from "./routes/login";
import refreshToken from "./routes/refresh";

const userRouter = Router();

userRouter.post("/login", login);
userRouter.post("/refresh-token", refreshToken);

export default userRouter;
