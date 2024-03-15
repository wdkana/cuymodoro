const HyperE = require('hyper-express')
const db = require("../config/database")
const moment = require('moment')

const features_route = new HyperE.Router()

features_route.get("/last/:username", async (req, res) => {
    const { username } = req.params
    db.query(`SELECT * FROM features WHERE username='${username}' AND status <> 'done' ORDER BY ID DESC LIMIT 1`, (err, result) => {
        if (err) return console.warn('get data feature error...')
        res.json({ features: result[0] })
    })
})

features_route.get("/get/:id", async (req, res) => {
    const { id } = req.params
    db.query(`SELECT title, level FROM features WHERE id='${id}'`, (err, result) => {
        if (err) return console.warn('get status error...')
        res.json({ title: result[0].title, level: result[0].level })
    })
})

features_route.post("/add", async (req, res) => {
    const { title, level } = await req.json()
    db.query(`INSERT INTO features (username, title, level) VALUES ('admin', '${title}','${level}')`, (err, result) => {
        if (err) return console.log("inserting features error!")
        res.json({
            id: result.insertId
        })
    })
})

features_route.put("/resume", async (req, res) => {
    const { id, username, level } = await req.json()
    db.query(`SELECT started_time, break_time, status, cycle FROM features WHERE id='${id}' AND username='${username}'`, (err, result) => {
        if (err) return console.log('error resuming task...')
        const started_time = result[0].started_time
        const break_time = result[0].break_time
        const status = result[0].status
        const cycle = result[0].cycle
        const incrementCycle = parseInt(cycle) + 1

        const startedMoment = moment(started_time, 'HH:mm:ss')
        const breakMoment = moment(break_time, 'HH:mm:ss')

        const duration = moment.duration(breakMoment.diff(startedMoment))

        const total_hours = moment.utc(duration.asMilliseconds()).format("HH:mm:ss")
        if (started_time && break_time && status == "break") {
            db.query(`UPDATE features SET cycle='${incrementCycle}', status='ongoing', level='${level}', started_time=NOW(), break_time=NULL where id='${id}' AND username='${username}'`)
            db.query(`INSERT INTO feature_history (feature_id, total_hours, username) VALUES ('${id}', '${total_hours}', '${username}')`)
        } else {
            console.log('cannot resuming the task')
        }
    })
})

features_route.put("/finish", async (req, res) => {
    const { id, username } = await req.json()
    db.query(`UPDATE features SET end_time=NOW(), status='done' WHERE id='${id}' AND username='${username}'`, (err, result) => {
        if (err) return console.log('updating feature end_time failed, sorry!')
        res.json({ id })
    })
})

features_route.put("/break", async (req, res) => {
    const { id, username } = await req.json()
    db.query(`UPDATE features SET break_time=NOW(), status='break' WHERE id='${id}' AND username='${username}'`, (err, result) => {
        if (err) return console.log('updating feature end_time failed, sorry!')
        res.json({ id })
    })
})

module.exports = features_route