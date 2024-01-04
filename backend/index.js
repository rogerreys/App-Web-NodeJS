const express = require("express");
var bodyParser = require('body-parser')

const config = require("./config");
const user = require("./api/components/user/network");
const login = require("./api/components/login/network");
const store = require("./api/components/store/network");
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
app.use('/login', login);
app.use('/store', store);

app.listen(config.api.PORT, () => {
    console.log(`Server is running on http://localhost:${config.api.PORT}`);
});