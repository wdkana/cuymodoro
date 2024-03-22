import {
  MiddlewareNext,
  Request,
  Response,
  MiddlewarePromise,
  MiddlewareHandler,
} from "hyper-express";
import { FAIL } from "@config/response.config";

export const AuthMiddleware: MiddlewareHandler = async (
  request: Request,
  response: Response,
  next: MiddlewareNext
): MiddlewarePromise => {
  const header = request.headers["cuytoken"];
  if (!header) FAIL(response, "cuytoken required for authorization");

  return next();
};

export const LoggerMiddleware: MiddlewareHandler = async (
  request: Request,
  _: Response,
  next: MiddlewareNext
): MiddlewarePromise => {
  console.log(`Resource executed in ${request.path}`);
  return next();
};
