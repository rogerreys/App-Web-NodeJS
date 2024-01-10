const express = require("express");
const controller = require("./controller");
const response = require("../../../network/response");
const secure = require("./secure")

const router = express.Router();


router.post("/login", login);
router.get("/decode", secure("get"), decode);

function login(req, res) {
    controller.login(req.body.email, req.body.password)
        .then((list) => {
            response.sucess(req, res, list, 200)
        })
        .catch((error) => {
            response.error(req, res, `Informacion invalida ${error}`, 400)
        });
}
function decode(req, res) {
    if (req.user) {
        let data = {
            username: req.user.username,
            email: req.user.email,
        }
        response.sucess(req, res, data, 200)
    } else {
        response.error(req, res, "No esta autenticado", 400)
    }
}

module.exports = router;