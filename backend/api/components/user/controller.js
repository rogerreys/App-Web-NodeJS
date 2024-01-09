// const db = require("../../../bdd/data")
const db = require("../../../bdd/connection");
const auth = require('../auth/controller');

let nanoid;
import('nanoid').then(module => {
    nanoid = module.nanoid;
    // el resto de tu código donde necesitas nanoid
}).catch(error => {
    console.error("Error al cargar nanoid:", error);
});

const TABLE = "user";

function list() {
    return db.list(TABLE)
}
function get(id) {
    return db.get(TABLE, id)
}
async function upsert(body) {

    const data = {
        name: body.name,
        nickname: body.username
    }
    data.id = (body.id) ? body.id : nanoid();

    if (body.password_user || body.username) {
        await auth.upsert({
            id: data.id,
            username: body.username,
            password: body.password_user
        })
    }
    
    return db.upsert(TABLE, data)
}
function remove(id) {
    return db.remove(TABLE, id)
}
function update(data) {
    return db.update(TABLE, data)
}

module.exports = {
    list,
    get,
    upsert,
    remove,
    update
}