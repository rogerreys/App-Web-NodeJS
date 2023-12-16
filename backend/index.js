const express = require("express");
var bodyParser = require('body-parser')

const response = require("./network/response");
const config = require("./config");
const user = require("./api/components/user/network");
var path = require("path");
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json());

// Directory public
app.use(express.static("./public"));
app.use(express.json());

app.use("/user", user);

app.get('*', (req, res) => {
    var options = {
        root: path.join(__dirname)
    };
    var site = {
        page: 'public/index.html',
        options: options
    }
    response.sucess_page(req, res, site, 200);
});

app.listen(config.api.PORT, () => {
    console.log(`Server is running on http://localhost:${config.api.PORT}`);
});