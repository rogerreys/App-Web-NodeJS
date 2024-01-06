const db = require("../../../bdd/connection");
const TABLE = "store";

function list_products() {
    return db.list(`${TABLE}_products`)
}
function list_catalog() {
    return db.list(`products_catalog`)
}

function insert(data) {
    return db.upsert(`${TABLE}_products`, data)
}

module.exports = {
    list_products,
    list_catalog,
    insert
}