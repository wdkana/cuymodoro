const db = require("./config/database")

const getLastDataByUsername = (username) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT * FROM features WHERE username='${username}' AND status <> 'done' ORDER BY ID DESC LIMIT 1`, (err, result) => {
                if (err) return reject(error)
                return resolve(result[0])
            }
        )
    })
}

const addNewTask = (username, title, level) => {
    return new Promise((resolve, reject) => {
        db.query(`INSERT INTO features (username, title, level) VALUES ('${username}', '${title}','${level}')`, (err, result) => {
            if (err) return reject(err)
            return resolve(result)
        })
    })
}

const checkFeatureStatus = (id, username) => {
    console.log("feature status checking...")
    return new Promise((resolve, reject) => {
        db.query(`SELECT started_time, break_time, status, cycle FROM features WHERE id='${id}' AND username='${username}'`, (err, result) => {
            if (err) return reject(err)
            return resolve(result[0])
        })
    })
}

const updateFeatureCycle = (id, username, level, incrementCycle) => {
    return new Promise((resolve, reject) => {
        db.query(`UPDATE features SET cycle='${incrementCycle}', status='ongoing', level='${level}', started_time=NOW(), break_time=NULL where id='${id}' AND username='${username}'`, (err, _) => {
            if (err) return reject(err)
            return resolve(true)
        })
    })
}

const createFeatureHistory = (id, username, total_hours) => {
    return new Promise((resolve, reject) => {
        db.query(`INSERT INTO feature_history (feature_id, total_hours, username) VALUES ('${id}', '${total_hours}', '${username}')`, (err, _) => {
            if (err) return reject(err)
            return resolve(true)
        })
    })
}

module.exports = { getLastDataByUsername, addNewTask, checkFeatureStatus, updateFeatureCycle, createFeatureHistory }