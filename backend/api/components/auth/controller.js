const jwt = require("../../../auth/index")
var bcrypt = require('bcryptjs');
const store = require('../../../bdd/connection');

const TABLA = "auth"

function login(username, password) {
    return new Promise((resolve, reject) => {
        store.get(TABLA, { username: username }).then((result) => {
            if (bcrypt.compareSync(password, result[0].password)) {
                // Generate token
                token = jwt.sign({ "id": result[0].id, "username": result[0].username, "password": result[0].password })
                resolve(token)
            }
        }).catch((err) => {
            return reject(err)
        });
    })
}

module.exports = { login }