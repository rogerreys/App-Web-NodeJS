const express = require("express");
const response = require("./network/response");
const config = require("./config");
const user = require("./api/components/user/network");
const login = require("./api/components/login/network");
var path = require("path");
const app = express();


// Directory public
app.use(express.static("./public"));
app.use(express.json());

app.use("/user", user);
app.use('/login', login);

app.listen(config.api.PORT, () => {
    console.log(`Server is running on http://localhost:${config.api.PORT}`);
});