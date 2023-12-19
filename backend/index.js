const express = require("express");
const response = require("./network/response");
const config = require("./config");
const user = require("./api/components/user/network");
var path = require("path");
const app = express();


// app.get('/', (req, res)=>{
//     res.send('<a href="auth/google">INICIAR SESIÓN</a>');
// })

// app.listen(5000, ()=> console.log('listen on: 5000'));

// Directory public
app.use(express.static("./public"));
app.use(express.json());

app.use("/user", user);

app.get('/login', (req, res) => {
    var options = {
        root: path.join(__dirname)
    };
    var site = {
        page: 'public/login.html',
        options: options
    }
    response.sucess_page(req, res, site, 200);
});

app.listen(config.api.PORT, () => {
    console.log(`Server is running on http://localhost:${config.api.PORT}`);
});