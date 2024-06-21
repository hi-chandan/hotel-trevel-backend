import { NextFunction, Request, Response } from "express";
import { AccessError, BadRequest } from "../utils/httperrors";
import jwt from "jsonwebtoken";
import prisma from "../config/prisma";
import { wrapper } from "../utils/wrapper";
import { HttpRes } from "../utils/httpres";
export const isAuth = wrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
      throw new AccessError("token invalid", 403);
    }

    const decode = (await jwt.verify(accessToken, "Thisistoken")) as string;
    const user = await prisma.user.findUnique({ where: { id: decode } });
    if (!user) {
      throw new BadRequest("User Not match", 400);
    }
    req.user = user;
    next();
  },
);

export const renewToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    throw new BadRequest("User must login In", 400);
  }
  const decode = (await jwt.verify(refreshToken, "Thisistoken")) as string;

  const user = await prisma.user.findUnique({ where: { email: decode } });
  if (!user) {
    throw new BadRequest("No user is Valid", 400);
  }

  const accessToken = await jwt.sign(user.id, "Thisistoken");

  res.cookie("accessToken", accessToken, {
    maxAge: 300000,
    httpOnly: true,
  });

  return HttpRes.ok(accessToken, "token is generated");
};
