var path = require("path");

module.exports = {
    api: {
        PORT: process.env.PORT || 3000
    },
    mysql: {
        host: process.env.HOST || 'db_mysql',
        user: process.env.USER || 'dbuser',
        password: process.env.PASSWORD_DB || 'root',
        database: process.env.DATABASE || 'maindb'
    },
    url:{
        path: path.join(__dirname),
        pathFront: "/public/component",
        pathUrlMain: "http://localhost:3000"
    }
}