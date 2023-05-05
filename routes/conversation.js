const express = require('express')
const router = express.Router()
const Pusher = require('pusher')
const { authenticate } = require('../middleware/auth')
const { findUser, findChat } = require('../controller/conversation')

router.get('/api/conversation', authenticate, findUser)
router.get('/api/conversation/message/:id', authenticate, findChat)

module.exports = router