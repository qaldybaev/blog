const pool = require("../config/db.config");

async function createTable(){
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users(
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL
            );

            CREATE TABLE IF NOT EXISTS blogs(
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                content TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                user_id INTEGER NOT NULL REFERENCES users(id)
                ON DELETE CASCADE
            );
            `)

            return "Database'da jadvallar yaratildi ✅"
    } catch (error) {
        throw new Error("Jadval yaratishda xatolik❌")
    }
}

module.exports = createTable