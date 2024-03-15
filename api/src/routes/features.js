const HyperE = require('hyper-express')
const db = require("../config/database")
const moment = require('moment')
const { getLastDataByUsername, addNewTask, checkFeatureStatus, updateFeatureCycle, createFeatureHistory } = require('../model')

const features_route = new HyperE.Router()

features_route.get("/last/:username", async (req, res) => {
    const { username } = req.params
    const result = await getLastDataByUsername(username)
    res.json({ features: result })
})

features_route.post("/add", async (req, res) => {
    const { username, title, level } = await req.json()
    const result = await addNewTask(username, title, level)
    console.log("🚀 ~ features_route.post ~ result:", result)
    res.json({
        id: result.insertId
    })
})

async function timeCalculation(started_time, break_time, status, incrementCycle, level, username, id) {
    const startedMoment = moment(started_time, 'HH:mm:ss')
    const breakMoment = moment(break_time, 'HH:mm:ss')

    const duration = moment.duration(breakMoment.diff(startedMoment))
    const total_hours = moment.utc(duration.asMilliseconds()).format("HH:mm:ss")

    if (started_time && break_time && status == "break") {
        const newCycle = await updateFeatureCycle(id, username, level, incrementCycle)
        if (newCycle) await createFeatureHistory(id, username, total_hours)
    }
}

features_route.put("/resume", async (req, res) => {
    const { id, username, level } = await req.json()
    const { started_time, break_time, status, cycle } = await checkFeatureStatus(id, username)
    const incrementCycle = parseInt(cycle) + 1
    const newTime = await timeCalculation(started_time, break_time, status, incrementCycle, level, username, id)
    res.json({ time: newTime })
})

features_route.put("/finish", async (req, res) => {
    const { id, username } = await req.json()
    db.query(`UPDATE features SET end_time=NOW(), status='done' WHERE id='${id}' AND username='${username}'`, (err, _) => {
        if (err) return console.log('updating feature end_time failed, sorry!')
        res.json({ id })
    })
})

features_route.put("/break", async (req, res) => {
    const { id, username } = await req.json()
    db.query(`UPDATE features SET break_time=NOW(), status='break' WHERE id='${id}' AND username='${username}'`, (err, _) => {
        if (err) return console.log('updating feature end_time failed, sorry!')
        res.json({ id })
    })
})

module.exports = features_route