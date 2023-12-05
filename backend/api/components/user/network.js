const express = require("express");
const controller = require("./controller");
const response = require("../../../network/response");

const router = express.Router();


router.get("/", list);
router.get("/:id", get);

function list(req, res){
    controller.list().then((data)=>{
        response.sucess(req, res, data, 200)
    }).catch((error)=>{
        response.error(req, res, error, 500)
    })
}
function get(req, res){
    
    controller.get(req.params.id).then((resp)=>{
        response.sucess(req,res,resp,200)
    }).catch((error)=>{
        response.error(req, res, error, 500)
    })

}


module.exports = router;