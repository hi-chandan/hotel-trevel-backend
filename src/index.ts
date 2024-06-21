import express, { Request, Response } from "express";
import { errorhandler } from "./middleware/errorhandler";
import { DBconnect } from "./config/mogodb";
import userRouter from "./router/user.route";
import prisma from "./config/prisma";
import cookieParser from "cookie-parser";
import postRouter from "./router/post.route";
import saveRouter from "./router/save.post.router";
import { cloud } from "./config/cloudnary";
import cors from "cors";
async function main() {
  const app = express();
  app.use(express.urlencoded({ extended: true }));
  app.use(
    cors({
      origin: "https://travel-and-stay-booking-app.vercel.app",
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    }),
  );
  prisma.$connect();
  cloud();

  app.use(express.json());
  app.use(cookieParser());

  app.use("/api", userRouter, postRouter, saveRouter);

  app.use(errorhandler);
  app.listen(3000, () => {
    console.log("Server is working");
  });
}

main();
