"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_control_1 = require("../controller/user.control");
const wrapper_1 = require("../utils/wrapper");
const verifytoken_1 = require("../middleware/verifytoken");
const schma_validation_1 = require("../middleware/schma.validation");
const userSchama_1 = require("../schema/userSchama");
const userRouter = (0, express_1.Router)();
userRouter.post("/register", schma_validation_1.validate.body(userSchama_1.signupInput), (0, wrapper_1.wrapper)(user_control_1.userControl.Create.bind(user_control_1.userControl)));
userRouter.post("/login", schma_validation_1.validate.body(userSchama_1.loginInput), (0, wrapper_1.wrapper)(user_control_1.userControl.login.bind(user_control_1.userControl)));
userRouter.post("/logout", verifytoken_1.isAuth, (0, wrapper_1.wrapper)(user_control_1.userControl.logout.bind(user_control_1.userControl)));
userRouter.get("/profile", verifytoken_1.isAuth, (0, wrapper_1.wrapper)(user_control_1.userControl.me.bind(user_control_1.userControl)));
//generate access token
userRouter.get("/refresh", (0, wrapper_1.wrapper)(verifytoken_1.renewToken.bind(verifytoken_1.renewToken)));
exports.default = userRouter;
