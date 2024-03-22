import HyperE, { Request, Response, Router } from "hyper-express";
import { OK } from "@config/response.config";

const main_router: Router = new HyperE.Router();

main_router.get("/", (_: Request, response: Response): void => {
  OK(response, {
    message: "cuymodoro API",
    data: {
      api_version: "1.0.0"
    },
  });
});

main_router.get("/status", (_: Request, response: Response): void => {
  OK(response, {
    message: "cuymodoro API STATUS",
    data: {
      status: "OK"
    },
  });
});

export default main_router;
