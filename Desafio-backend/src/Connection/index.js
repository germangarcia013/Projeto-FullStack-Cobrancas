require('dotenv').config()

console.log('HOST:', JSON.stringify(process.env.DB_HOST))
const knex = require('knex')({
    client: 'pg',
    connection: {
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_DATABASE,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
        ssl: { rejectUnauthorized: false },
    },
})


module.exports = knex;