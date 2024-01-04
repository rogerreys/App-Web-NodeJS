const express = require("express");
// const controller = require("./controller");
const response = require("../../../network/response");

var config = require("../../../config");

const router = express.Router();

router.get("/auth", login);

function login(req, res){
    var options = {
        root: config.url.path
    };
    
    var site = {
        page: `${config.url.pathFront}/login/login.html`,
        options: options
    }
    response.sucess_page(req, res, site, 200);
}

module.exports = router;