const express = require("express");
const controller = require("./controller");
const response = require("../../../network/response");

const router = express.Router();


router.post("/login", login);

function login(req, res) {
    controller.login(req.body.username, req.body.password)
        .then((list) => {
            response.sucess(req, res, list, 200)
        })
        .catch((error) => {
            response.error(req, res, `Informacion invalida ${error}`, 400)
        });
}

module.exports = router;