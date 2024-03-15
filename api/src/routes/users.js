const HyperE = require("hyper-express")
const user_router = new HyperE.Router()
const db = require("../config/database")

user_router.get("/profile", async (req, res) => {
    db.query("SELECT * FROM users", (err, result) => {
        if (err) throw new Error("error!")
        const profile = {
            username: result[0].username,
            token: result[0].token
        }
        res.json({ profile })
    })
})

user_router.post("/login", async (req, res) => {
    console.log('user login access')
    res.send('login user')
})

module.exports = user_router
