import { Router } from "express";
import { login } from "./routes/login";
import refreshToken from "./routes/refresh";
import { logout } from "./routes/logout";

const userRouter = Router();

userRouter.post("/login", login);
userRouter.delete("/logout", logout);
userRouter.post("/refresh-token", refreshToken);

export default userRouter;
