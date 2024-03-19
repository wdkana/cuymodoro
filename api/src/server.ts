import HyperE from "hyper-express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import features_route from "./routes/features";
import user_router from "./routes/users";
import main_router from "./routes/main";
import { auth_middleware } from "./config/middleware";

const PORT = Number(process.env.PORT) || 3002;
const hyper = new HyperE.Server();

hyper.use(cors());

hyper.use("/", main_router);
hyper.use("/users", auth_middleware, user_router);
hyper.use("/features", features_route);

hyper
  .listen(PORT)
  .then(() => console.log(`server running at ${PORT}`))
  .catch(() => console.warn(`something wrong in the server`));
