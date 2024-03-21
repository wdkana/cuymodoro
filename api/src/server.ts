import HyperE from "hyper-express";
import dotenv from "dotenv";
import cors from "cors";
import main_router from "@routes/main.route";
import user_router from "@routes/users.route";
import { LoggerMiddleware } from "./middleware";
// import features_route from "@routes/features.route";
// import { auth_middleware } from "./middleware";

const PORT: number = Number(process.env.PORT) || 3002;
const hyper = new HyperE.Server();
dotenv.config();

hyper.use(cors());

hyper.use("/", main_router);
hyper.use("/users", [LoggerMiddleware] as any, user_router);

// hyper.use('/features', { middlewares: [{ pattern: '', middleware: auth_middleware }] } as any, features_route);

hyper
  .listen(PORT)
  .then(() => console.log(`server running at ${PORT}`))
  .catch(() => console.warn(`something wrong in the server`));
