const db = require("../../../bdd/connection");
const TABLE = "store";

function list_products() {
    return db.list(`${TABLE}_products`)
}

function insert(data) {
    return db.upsert(`${TABLE}_products`, data)
}

module.exports = {
    list_products,
    insert
}