const express = require("express");
const response = require("../../../network/response");

var config = require("../../../config");

const router = express.Router();

router.get("/add", insert);

function insert(req, res){
    var options = {
        root: config.url.path
    };
    
    var site = {
        page: `${config.url.pathFront}/user/add_user.html`,
        options: options
    }
    response.sucess_page(req, res, site, 200);
}

module.exports = router;