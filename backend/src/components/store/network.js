const express = require("express");
const response = require("../../../network/response");

var config = require("../../../config");

const router = express.Router();

router.get("/products", products);

function products(req, res){
    var options = {
        root: config.url.path
    };
    
    var site = {
        page: `${config.url.pathFront}/store/store.html`,
        options: options
    }
    response.sucess_page(req, res, site, 200);
}

module.exports = router;