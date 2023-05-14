const express = require('express')
const router = express.Router()
const { authenticate } = require('../middleware/auth')
const { addChat } = require('../controller/message')



router.post('/api/chat', authenticate, addChat)

module.exports = router