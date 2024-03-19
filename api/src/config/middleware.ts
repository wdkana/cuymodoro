import { Request, Response } from "hyper-express";

export const auth_middleware = (req: Request, res: Response, next: () => void) => {
  console.log("auth protection...");
  next();
};
