const HyperE = require('hyper-express')
const cors = require('cors')
const db = require("./config/database")

const hyper = new HyperE.Server()
const PORT = process.env.PORT || 3002

hyper.use(cors())

const auth_middleware = (req, res, next) => {
    console.log('auth protection...')
    next()
}

hyper.get("/", { middlewares: [auth_middleware] }, async (_, r) => {
    console.log('get api ready!')
    return r.json(
        {
            status: "OK",
            api_version: "1.0.0"
        })
})

const features_route = new HyperE.Router()

features_route.get("/last/:username", async (req, res) => {
    const { username } = req.params
    console.log("🚀 ~ features_route.get ~ username:", username)

    db.query(`SELECT * FROM features where username='${username}' ORDER BY ID DESC LIMIT 1`, (err, result) => {
        console.log(result)
        if (err) return console.warn('get data feature error...')
        res.json({ features: result[0] })
    })
})

features_route.get("/get/:id", async (req, res) => {
    const { id } = req.params
    db.query(`SELECT title, level FROM features where id='${id}'`, (err, result) => {
        if (err) return console.warn('get status error...')
        res.json({ title: result[0].title, level: result[0].level })
    })
})

features_route.post("/add", async (req, res) => {
    const { title, level } = await req.json()
    db.query(`insert into features (username, title, level) VALUES ('admin', '${title}','${level}')`, (err, result) => {
        if (err) return console.log("inserting features error!")
        res.json({
            id: result.insertId
        })
    })
})

features_route.put("/break", async (req, res) => {
    const { id, break_time } = await req.json()
    db.query(`update features set break_time='${break_time}', status='break' where id='${id}'`, (err, result) => {
        if (err) return console.log('updating feature end_time failed, sorry!')
        res.json({ id })
    })
})


const user_router = new HyperE.Router()

user_router.get("/profile", async (req, res) => {
    db.query("select * from users", (err, result) => {
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

hyper.use("/users", user_router)
hyper.use("/features", features_route)

hyper.listen(PORT)
    .then(() => console.log(`server running at ${PORT}`))
    .catch(() => console.warn(`something wrong in the server`))