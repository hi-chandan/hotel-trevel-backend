import { Request, Response, NextFunction } from "express";
import { HttpRes } from "./httpres";

export type ReqHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => any;
export const wrapper = (func: ReqHandler): ReqHandler => {
  return (req, res, next) => {
    try {
      const result = func(req, res, next);
      if (result instanceof Promise) {
        result
          .then((val: any) => {
            if (HttpRes.isHttpRes(val)) {
              res.status(val.status).json(val);
            } else if (val && val !== res) {
              res.send(val);
            }
          })
          .catch(next);
      }
    } catch (error) {
      next(error);
    }
  };
};

// function handleResult(result: any, res: any): void {
//   if (HttpRes.isHttpRes(result)) {
//     res.status(result.status).json(result);
//   } else if (result && result !== res) res.send(result);
// }
