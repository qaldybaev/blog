const { config } = require("dotenv")
const { Pool } = require("pg")

config()
const pool = new Pool({
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
})

module.exports = pool;