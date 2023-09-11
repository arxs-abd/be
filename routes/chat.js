const express = require('express')
const router = express.Router()
const { authenticate } = require('../middleware/auth')
const { addChat, getAllChat, createCall, getToken, rejectCall, stopCall } = require('../controller/message')

router.post('/api/chat', authenticate, addChat)
router.post('/api/getToken', authenticate, getToken)
router.post('/api/call', authenticate, createCall)
router.post('/api/rejectCall', authenticate, rejectCall)
router.post('/api/stopCall', authenticate, stopCall)
router.get('/api/allChat', authenticate, getAllChat)

module.exports = router
