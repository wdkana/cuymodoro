import HyperE from "hyper-express";
import features_route from "./routes/features";
import cors from "cors";
import user_router from "./routes/users";
import main_router from "./routes/main";
import auth_middleware from "./config/middleware";

const hyper = new HyperE.Server();

const PORT = process.env.PORT || 3002;

hyper.use(cors());

hyper.use("/", main_router);
hyper.use("/users", [auth_middleware], user_router);
hyper.use("/features", features_route);

hyper
    .listen(+PORT)
    .then(() => console.log(`server running at ${PORT}`))
    .catch(() => console.warn(`something wrong in the server`));
