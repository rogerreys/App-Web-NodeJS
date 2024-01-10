const jwt = require("../../../auth/index")
var bcrypt = require('bcryptjs');
const store = require('../../../bdd/connection');

const TABLA = "auth"

async function upsert(data) {
    const authData = {
        id: data.id
    }
    if (data.username && data.email) {
        authData.username = data.username;
        authData.email = data.email;
    }
    if (data.password) {
        const salt = await bcrypt.genSalt(5);
        const secPass = await bcrypt.hash(data.password, salt);
        authData.password = secPass;
    }

    return store.upsert(TABLA, authData);
}

function login(email, password) {
    return new Promise((resolve, reject) => {
        store.get(TABLA, { email: email }).then((result) => {
            if(result){
                if (bcrypt.compareSync(password, result[0].password)) {
                    // Generate token
                    token = jwt.sign({ "id": result[0].id, "username": result[0].username, "password": result[0].password, "email": result[0].email })
                    resolve(token)
                }else{
                    reject("Error")
                }
            }
        }).catch((err) => {
            return reject(err)
        });
    })
}

module.exports = { upsert, login }