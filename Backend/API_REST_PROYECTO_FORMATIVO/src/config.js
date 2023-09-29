require('dotenv').config();

module.exports = {
    app:{
        port: process.env.PORT || 3000,
    },
    mysql:{
        host: process.env.MYSQL_HOST || 'localhost',
        user: process.env.MYSQL_USER || 'root',
        password: process.env.MYSQL_PASSWORD || 'jaredleto30secondstomars',
        database: process.env.MYSQL_DB || 'ecommerce'
    }
}