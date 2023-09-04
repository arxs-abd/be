const { Pool } = require('pg')
const { v4: uuid } = require('uuid')

const service = {
  add: async (user1, user2) => {
    const id = 'chat-' + uuid()
    const time = new Date().toISOString()

    const connection = new Pool({
      connectionString: process.env.POSTGRES_URL + '?sslmode=require',
    })

    const query = {
      text: 'INSERT INTO conversations VALUES($1, $2, $3, $4) RETURNING id',
      values: [id, user1, user2, time],
    }

    const result = await connection.query(query)
    await connection.end()
    return result.rows[0].id
  },
  find: async (userId) => {
    const connection = new Pool({
      connectionString: process.env.POSTGRES_URL + '?sslmode=require',
    })

    const query = {
      text: 'SELECT * FROM conversations WHERE user1_id = $1 OR user2_id = $1',
      values: [userId],
    }
    const result = await connection.query(query)
    await connection.end()
    return result.rows
  },
}

module.exports = service
