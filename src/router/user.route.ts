import { Router } from "express";
import { userControl } from "../controller/user.control";
import { wrapper } from "../utils/wrapper";
import { isAuth, renewToken } from "../middleware/verifytoken";
import { validate } from "../middleware/schma.validation";
import { loginInput, signupInput } from "../schema/userSchama";
import { register } from "module";
const userRouter = Router();

userRouter.post(
  "/register",
  validate.body(signupInput),
  wrapper(userControl.Create.bind(userControl)),
);
userRouter.post(
  "/login",
  validate.body(loginInput),
  wrapper(userControl.login.bind(userControl)),
);
userRouter.get(
  "/logout",
  isAuth,
  wrapper(userControl.logout.bind(userControl)),
);
userRouter.get("/profile", isAuth, wrapper(userControl.me.bind(userControl)));

//generate access token
userRouter.get("/refresh", wrapper(renewToken.bind(renewToken)));

export default userRouter;
