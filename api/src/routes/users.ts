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

user_router.post("/login", async (req: Request, res: Response) => {
  const {data: { username, password }} = JSON.parse(await req.text())
  
  console.log("🚀 ~ user_router.post:", username)
  console.log("🚀 ~ user_router.post:", password)
  res.send("LOGIN OK");
});

user_router.post("/register", async (req: Request, res: Response) => {
  const {data: { username, password }} = JSON.parse(await req.text())
  console.log({username})
  console.log({password})

  db.query(`INSERT INTO users (username, password) VALUES ('${username}','${password}')`, (err, result) => {
    
    if (err) console.error("error!", err.message);
    if  (result.affectedRows) {
      res.json({
        is_register: true,
        message: "Register Successfull!"
      })
    }
  });
});

export default user_router;
