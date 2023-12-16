const express = require("express");
const controller = require("./controller");
const response = require("../../../network/response");

const router = express.Router();


router.get("/", list);
router.get("/:id", get);
router.post("/add", upsert);

function list(req, res) {
    controller.list().then((data) => {
        response.sucess(req, res, data, 200)
    }).catch((error) => {
        response.error(req, res, error, 500)
    })
}
function get(req, res) {
    controller.get(req.params.id).then((resp) => {
        response.sucess(req, res, resp, 200)
    }).catch((error) => {
        response.error(req, res, error, 500)
    })
}
function upsert(req, res) {
    controller.upsert(req.body).then((resp) => {
        response.sucess(req, res, resp, 200)
    }).catch((err) => {
        response.error(req, res, err, 500)
    })
}


module.exports = router;