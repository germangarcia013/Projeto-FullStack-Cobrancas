require('dotenv').config();

module.exports = {
  development: {
    client: 'pg',
    connection: {
      user: process.env.DB_USER || "postgres", 
      host: process.env.DB_HOST || "db",
      database: process.env.DB_DATABASE || "meu_banco",
      password: process.env.DB_PASSWORD || "postgres", 
      port: process.env.DB_PORT || 5432,
      ssl: false
    },
    migrations: {
      directory: './migrations'
    }
  }
};