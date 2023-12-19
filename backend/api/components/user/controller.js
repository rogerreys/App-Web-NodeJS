//const db = require("../../../bdd/data")
const db = require("../../../bdd/connection");
const TABLE = "user";

function list(){
    return db.list(TABLE)
}
function get(id){
    return db.get(TABLE, id)
}
function upsert(data){
    return db.upsert(TABLE, data)
}
function remove(id){
    return db.remove(TABLE, id)
}
function update(data){
    return db.update(TABLE, data)
}

module.exports = {
    list,
    get,
    upsert,
    remove,
    update
}