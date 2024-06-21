import { Request, Response } from "express";
import { BadRequest } from "../utils/httperrors";
import { HttpRes } from "../utils/httpres";
import { UserService, userService } from "../service/auth.service";
import jwt from "jsonwebtoken";
import { tokenservice } from "../service/token.service";
import { loginInput, signupInput } from "../schema/userSchama";
class UserControl {
  constructor(private userService: UserService) {}

  async Create(req: Request, res: Response) {
    const data = req.body;
    console.log(data);
    const user = await this.userService.Signup(data);
    tokenservice(user, res);

    return HttpRes.ok(user, "user is Register");
  }
  async login(req: Request, res: Response) {
    const data = req.body;

    const user = await this.userService.login(data);
    tokenservice(user, res);

    return HttpRes.ok(user, "login successful");
  }
  async logout(req: Request, res: Response) {
    await this.userService.logout(res);

    return "logout success";
  }
  async me(req: Request, res: Response) {
    const user = req.user;

    return HttpRes.ok(user, "user information");
  }
}

export const userControl = new UserControl(userService);
