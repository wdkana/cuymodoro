const HyperE = require("hyper-express")
const main_router = new HyperE.Router()

main_router.get("/", async (_, r) => {
    console.log('get api ready!')
    return r.json(
        {
            status: "OK",
            api_version: "1.0.0"
        })
})

module.exports = main_router
