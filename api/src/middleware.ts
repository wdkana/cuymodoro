import {
  Request,
  Response,
} from "hyper-express";
import { FAIL } from "@config/response.config";
import UserController from "@controllers/users.controller";

export const authMiddleware = async (
  request: Request,
  response: Response,
) => {
    const { username } = await request.json()
    const token = request.headers["cuytoken"];

    if (!token) FAIL(response, "cuytoken required for authorization");

    const isTokenVerify = await UserController.isTokenVerified({ username, token })

    if (!isTokenVerify) {
      FAIL(response, "cuytoken missmatched");
    }
};
