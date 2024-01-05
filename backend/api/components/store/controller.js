const db = require("../../../bdd/connection");
const TABLE = "store";

function list_products() {
    return db.list(`${TABLE}_products`)
}


module.exports = {
    list_products
}