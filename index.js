const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const routeChat = require('./routes/chat')

const app = express()
const port = process.env.PORT || 3000

app.use(cors({
  origin: '*'
}))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extends : true,
}))

app.use(routeChat)

const server = app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

module.exports = server