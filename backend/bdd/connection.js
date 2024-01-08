const mysql = require("mysql")
const config = require("../config")

let dbconfig = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database
}

let connection;

function handleConnection() {
    connection = mysql.createConnection(dbconfig);
    connection.connect((err) => {
        if (err) {
            console.log("[DB ERROR]" + err);
            setTimeout(handleConnection, 2000);
        } else {
            console.log("--- DB CONNECTED ---");
        }
    });
    connection.on('error', (err) => {
        console.log("[DB ERROR]" + err);
        if (err.code === "PROTOCOL_CONNECTION_LOST") {
            handleConnection();
        } else {
            throw err;
        }
    });
}

handleConnection()

// FUNCIONES QUERIES
function list(table) {
        return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table}`, (err, data) => {
            if (err) {
                console.error("[ERROR LIST]" + err);
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}
function list_by(table, data) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} WHERE ?`, data, (err, data) => {
            if (err) {
                console.error("[ERROR LIST]" + err);
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}
function upsert(table, data) {
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO ${table} SET ?`, data, (err, data) => {
            if (err) {
                console.error("[ERROR LIST]" + err);
            } else {
                resolve(data)
            }
        })
    })
}

module.exports = { list, list_by, upsert }