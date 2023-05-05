const express = require('express')
const router = express.Router()
const Pusher = require('pusher')
const { authenticate } = require('../middleware/auth')
const { findChat } = require('../controller/conversation')

router.get('/api/conversation', authenticate, findChat)

module.exports = router