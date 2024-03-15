import HyperE from "hyper-express";
import db from "../config/database";

const user_router = new HyperE.Router();

user_router.get("/profile", async (req, res) => {
    db.query("SELECT * FROM users", (err, result) => {
        if (err) throw new Error("error!");
        const profile = {
            username: result[0].username,
            token: result[0].token,
        };
        res.json({ profile });
    });
});

user_router.post("/login", async (req, res) => {
    console.log("user login access");
    res.send("login user");
});

export default user_router;
