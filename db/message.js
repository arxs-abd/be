const { Pool } = require('pg')
const {v4 : uuid} = require('uuid')


const service = {
    add : async (convId, sender, message) => {
        const id = 'msg-' + uuid()
        const time = new Date().toISOString()

        const connection = new Pool({
            connectionString : process.env.POSTGRES_URL + '?sslmode=require',
        })

        const query = {
            text : 'INSERT INTO messages VALUES($1, $2, $3, $4, $5) RETURNING id, message, created_at',
            values : [id, convId, sender, message, time],
        }

        const result = await connection.query(query)
        await connection.end()
        return result.rows[0]
    },
    findChat : async (convId) => {
        const connection = new Pool({
            connectionString : process.env.POSTGRES_URL + '?sslmode=require',
        })
        const query = {
            text : 'SELECT * FROM messages WHERE conversation_id = $1',
            values : [convId],
        }
        const result = await connection.query(query)
        await connection.end()
        return result.rows
    }
}

module.exports = service