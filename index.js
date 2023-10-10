require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const routeAuth = require('./routes/auth')
const routeChat = require('./routes/chat')
const routeConversation = require('./routes/conversation')
const routeStatus = require('./routes/status')
const routeBattleship = require('./routes/battleship')

const app = express()
const port = process.env.PORT || 3001

app.use(cors({
  origin: '*'
}))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded())

app.use(routeAuth)
app.use(routeChat)
app.use(routeConversation)
app.use(routeStatus)

// battleship
app.use('/battleship/api', routeBattleship)


const server = app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

module.exports = server