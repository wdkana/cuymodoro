import { MiddlewareNext, Request, Response } from "hyper-express";

export const auth_middleware = (
  _: Request,
  __: Response,
  next: MiddlewareNext
) => {
  console.log("auth protection...");
  next();
};
