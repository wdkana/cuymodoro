import HyperE, { Request, Response } from "hyper-express";
const user_router = new HyperE.Router();
import { connection as db } from "../config/database";

user_router.get("/profile", async (_: Request, res: Response) => {
  db.query("SELECT * FROM users", (err, result) => {
    if (err) throw new Error("error!");
    const profile = {
      username: result[0].username,
      token: result[0].token,
    };
    res.json({ profile });
  });
});

user_router.post("/login", async (_: Request, res: Response) => {
  console.log("user login access");
  res.send("login user");
});

export default user_router;
