const { Pool } = require('pg')
const {v4 : uuid} = require('uuid')

const service = {
    add : async (username, password) => {
        const connection = new Pool({
            connectionString : process.env.POSTGRES_URL + '?sslmode=require',
        })
        const id = 'user-' + uuid()

        const query = {
            text : 'INSERT INTO users VALUES($1, $2, $3) RETURNING id',
            values : [id, username, password],
        }

        const result = await connection.query(query)
        await connection.end()
        return result.rows[0].id
    },
    find : async (id) => {
        const query = {
            text : 'SELECT * FROM  users WHERE id = $1',
            values : [id],
        }
        const connection = new Pool({
            connectionString : process.env.POSTGRES_URL + '?sslmode=require',
        })

        const result = await connection.query(query)
        await connection.end()
        return result.rows[0]
    },
    findWhere : async (username) => {
        const query = {
            text : 'SELECT * FROM  users WHERE username = $1',
            values : [username],
        }
        const connection = new Pool({
            connectionString : process.env.POSTGRES_URL + '?sslmode=require',
        })

        const result = await connection.query(query)
        await connection.end()
        return result.rows[0]
    }   
}

module.exports = service