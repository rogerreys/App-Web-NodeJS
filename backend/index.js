const express = require("express");
const response = require("./network/response");
const config = require("./config")
// const login = require("./api/components/login/network")

const app = express();

// Directory public
app.use(express.static("./public"));
app.use(express.json());

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