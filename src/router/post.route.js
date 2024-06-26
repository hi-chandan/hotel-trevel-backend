"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const wrapper_1 = require("../utils/wrapper");
const post_control_1 = require("../controller/post.control");
const verifytoken_1 = require("../middleware/verifytoken");
const schma_validation_1 = require("../middleware/schma.validation");
const post_schama_1 = require("../schema/post.schama");
const multer_1 = __importDefault(require("../config/multer"));
const postRouter = (0, express_1.Router)();
postRouter.post("/post", (0, wrapper_1.wrapper)(verifytoken_1.isAuth), multer_1.default.single("file"), schma_validation_1.validate.body(post_schama_1.postInput), (0, wrapper_1.wrapper)(post_control_1.postControl.addPost.bind(post_control_1.postControl)));
postRouter.put("/post/:id", (0, wrapper_1.wrapper)(verifytoken_1.isAuth), (0, wrapper_1.wrapper)(post_control_1.postControl.updatePost.bind(post_control_1.postControl)));
postRouter.delete("/post/:id", (0, wrapper_1.wrapper)(verifytoken_1.isAuth), (0, wrapper_1.wrapper)(post_control_1.postControl.deletePost.bind(post_control_1.postControl)));
postRouter.get("/userposts", (0, wrapper_1.wrapper)(verifytoken_1.isAuth), (0, wrapper_1.wrapper)(post_control_1.postControl.userPost.bind(post_control_1.postControl)));
postRouter.get("/posts", (0, wrapper_1.wrapper)(post_control_1.postControl.getPosts.bind(post_control_1.postControl)));
postRouter.get("/post/:id", (0, wrapper_1.wrapper)(post_control_1.postControl.getPost.bind(post_control_1.postControl)));
exports.default = postRouter;
