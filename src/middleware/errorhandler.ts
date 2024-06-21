import { NextFunction, Request, Response } from "express";
import { HttpErrors } from "../utils/httperrors";
import { ZodError } from "zod";

export const errorhandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (HttpErrors.isHttpErrors(err)) {
    return res.status(err.statusCode).json({
      error: err.jsonData,
    });
  }

  if (err instanceof ZodError) {
    return res.status(402).json({
      error: err.issues,

      errorObj: err.issues.reduce((acc, { message, path }) => {
        acc[path[0]] = message;
        return acc;
      }, {} as Record<string, string>),
    });
  }

  return res.json({
    error: {
      message: "Internal server Error",
      statusCode: 500,
      error: err,
    },
  });
};
