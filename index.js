require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const routeAuth = require('./routes/auth')
const routeChat = require('./routes/chat')
const routeConversation = require('./routes/conversation')
const routeStatus = require('./routes/status')

const app = express()
const port = process.env.PORT || 3001

app.use(cors({
  origin: '*'
}))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extends : true,
}))

app.use(routeAuth)
app.use(routeChat)
app.use(routeConversation)
app.use(routeStatus)


const server = app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

module.exports = server