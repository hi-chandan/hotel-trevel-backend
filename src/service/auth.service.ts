import prisma from "../config/prisma";
import { BadRequest } from "../utils/httperrors";
import { userInput } from "../schema/userSchama";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { HttpRes } from "../utils/httpres";
import { clearScreenDown } from "readline";
export class UserService {
  constructor(private userModel: PrismaClient["user"]) {}

  async Signup(data: userInput) {
    const { email, password } = data;

    const existing = await this.userModel.findUnique({ where: { email } });
    if (existing) {
      throw new BadRequest("user is already registed", 400);
    }
    const hashPassword = await bcrypt.hashSync(password, 10);
    data.password = hashPassword;
    const user = await this.userModel.create({ data });

    if (!user) {
      throw new BadRequest("user not created", 400);
    }
    return user;
  }
  async login(data: any) {
    const { email, password } = data;

    const user = await this.userModel.findUnique({ where: { email } });
    if (!user) {
      throw new BadRequest("User is not Register", 400);
    }

    const Match = await bcrypt.compare(password, user.password);
    if (!Match) {
      throw new BadRequest("Invalid user", 400);
    }
    return user;
  }
  async logout(res: any) {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
  }
  async me(data: any) {}
}

export const userService = new UserService(prisma.user);
