const { Pool } = require('pg')
const {v4 : uuid} = require('uuid')

const connection = new Pool({
    connectionString : process.env.POSTGRES_URL + '?sslmode=require',
})

const service = {
    add : async (username, password) => {
        const id = 'user-' + uuid()

        const query = {
            text : 'INSERT INTO users VALUES($1, $2, $3) RETURNING id',
            values : [id, username, password],
        }

        const result = await connection.query(query)
        return result.rows[0].id
    },
    findWhere : async (username) => {
        const query = {
            text : 'SELECT * FROM  users WHERE username = $1',
            values : [username],
        }

        const result = await connection.query(query)
        return result.rows[0]
    }   
}

module.exports = service