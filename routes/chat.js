const express = require('express')
const router = express.Router()
const { authenticate } = require('../middleware/auth')
const { addChat, getAllChat } = require('../controller/message')

router.post('/api/chat', authenticate, addChat)
router.get('/api/allChat', authenticate, getAllChat)

module.exports = router
