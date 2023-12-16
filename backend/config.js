module.exports = {
    api: {
        PORT: process.env.PORT || 3000
    },
    mysql: {
        host: process.env.HOST || 'db_mysql',
        user: process.env.USER || 'dbuser',
        password: process.env.PASSWORD_DB || 'root',
        database: process.env.DATABASE || 'maindb'
    }
}