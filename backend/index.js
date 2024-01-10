// LIBRERIAS
const express = require("express");
var bodyParser = require('body-parser')

// CONFIG
const config = require("./config");
// RUTAS API
const user = require("./api/components/user/network");
const auth = require("./api/components/auth/network");
// RUTAS PANTALLAS
const loginComponent = require("./src/components/login/network");
const storeComponent = require("./src/components/store/network");
const userComponent = require("./src/components/user/network");
const api_store = require("./api/components/store/network");
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json());

// Directory public
app.use(express.static("./public"));
app.use(express.json());

// COMPONENT
app.use('/user', userComponent);
app.use('/login', loginComponent);
app.use('/store', storeComponent);

// API
app.use("/api/user", user);
app.use('/api/store', api_store);
app.use('/api/auth', auth);

app.listen(config.api.PORT, () => {
    console.info(`Server is running on http://localhost:${config.api.PORT}`);
});