import HyperE from "hyper-express";
import dotenv from "dotenv";
import cors from "cors";
import main_router from "@routes/main.route";
import user_router from "@routes/users.route";
import features_route from "@routes/features.route";

const PORT: number = Number(process.env.PORT) || 3002;
const hyper = new HyperE.Server();
dotenv.config();

hyper.use(cors());

hyper.use("/", main_router);
hyper.use("/users", user_router);
hyper.use('/features', features_route);

hyper
  .listen(PORT)
  .then(() => console.log(`server running at ${PORT}`))
  .catch(() => console.warn(`something wrong in the server`));
