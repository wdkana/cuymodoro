import mysql from "mysql";

const connection = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: "",
    database: "cuymodoro",
});

export default connection;
