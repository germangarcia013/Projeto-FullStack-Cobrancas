require('dotenv').config()

console.log('HOST:', JSON.stringify(process.env.DB_HOST))
const knex = require('knex')({
    client: 'pg',
    connection: {
        user: process.env.DB_USER || "postgres",
        host: process.env.DB_HOST || "db",
        database: process.env.DB_DATABASE || "meu_banco",
        password: process.env.DB_PASSWORD || "postgres",
        port: process.env.DB_PORT || 5432,
        ssl: { rejectUnauthorized: false },
    },
})


module.exports = knex;