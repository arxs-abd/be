const express = require('express')
const router = express.Router()
const { authenticate } = require('../middleware/auth')
const { addChat, getAllChat, createCall } = require('../controller/message')

router.post('/api/chat', authenticate, addChat)
router.post('/api/call', authenticate, createCall)
router.get('/api/allChat', authenticate, getAllChat)

module.exports = router
