import { MiddlewareHandler } from "hyper-express";
const auth_middleware: MiddlewareHandler = (req, res, next) => {
    console.log("auth protection...");
    next();
};

export default auth_middleware;
