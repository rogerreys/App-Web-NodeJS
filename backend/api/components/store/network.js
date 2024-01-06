const express = require("express");
const controller = require("./controller");
const response = require("../../../network/response");

const router = express.Router();

router.get("/products", products);
router.post("/products", insert);

function products(req, res){
    controller.list_products().then((data) => {
        response.sucess(req, res, data, 200)
    }).catch((error) => {
        response.error(req, res, error, 500)
    })
}
function insert(req, res){
    controller.insert(req.body).then((data) => {
        response.sucess(req, res, data, 200)
    }).catch((error) => {
        response.error(req, res, error, 500)
    })
}

module.exports = router;