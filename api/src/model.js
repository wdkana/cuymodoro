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

module.exports = { getLastDataByUsername, addNewTask }