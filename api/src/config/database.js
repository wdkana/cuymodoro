const mysql = require('mysql')

const connection = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'cuymodoro'
})

module.exports = connection