import express, { Router } from "express";
import { wrapper } from "../utils/wrapper";
import { postControl } from "../controller/post.control";
import { isAuth } from "../middleware/verifytoken";
import { validate } from "../middleware/schma.validation";
import { postInput } from "../schema/post.schama";
import upload from "../config/multer";

const postRouter = Router();

postRouter.post(
  "/post",

  wrapper(isAuth),
  upload.single("file"),
  validate.body(postInput),
  wrapper(postControl.addPost.bind(postControl)),
);
postRouter.put(
  "/post/:id",
  wrapper(isAuth),
  wrapper(postControl.updatePost.bind(postControl)),
);

postRouter.delete(
  "/post/:id",
  wrapper(isAuth),
  wrapper(postControl.deletePost.bind(postControl)),
);

postRouter.get(
  "/userposts",
  wrapper(isAuth),
  wrapper(postControl.userPost.bind(postControl)),
);
postRouter.get(
  "/posts",

  wrapper(postControl.getPosts.bind(postControl)),
);
postRouter.get("/post/:id", wrapper(postControl.getPost.bind(postControl)));

export default postRouter;
