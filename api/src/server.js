const HyperE = require('hyper-express')
const hyper = new HyperE.Server()

const features_route = require('./routes/features')
const user_router = require('./routes/users')
const main_router = require('./routes/main')

const PORT = process.env.PORT || 3002
const cors = require('cors')
const { auth_middleware } = require('./config/middleware')

hyper.use(cors())

hyper.use("/", main_router)
hyper.use("/users", { middlewares: [auth_middleware] }, user_router)
hyper.use("/features", features_route)

hyper.listen(PORT)
    .then(() => console.log(`server running at ${PORT}`))
    .catch(() => console.warn(`something wrong in the server`))