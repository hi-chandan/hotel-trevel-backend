import httpStatus from "http-status";
import { AnyZodObject, ZodError } from "zod";
import { wrapper } from "../utils/wrapper";

const validateFn = (
  schema: AnyZodObject,
  type: "body" | "query" | "params" | "all",
) =>
  wrapper(async (req, _, next) => {
    try {
      if (type !== "all") {
        req[type] = await schema.parse(req[type]);
      } else {
        Object.assign(
          req,
          await schema.parse({
            body: req.body,
            query: req.query,
            params: req.params,
          }),
        );
      }
      // call next
      next();
    } catch (error) {
      // zod error
      if (error instanceof ZodError) {
        throw error;
      }
    }
  });

export const validate = {
  // all validator
  all: (schema: any) => validateFn(schema, "all"),
  // only body validator
  body: (schema: any) => validateFn(schema, "body"),
  // only query validator
  query: (schema: AnyZodObject) => validateFn(schema, "query"),
  // only params validator
  params: (schema: AnyZodObject) => validateFn(schema, "params"),
};
