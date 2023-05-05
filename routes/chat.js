const express = require('express')
const router = express.Router()
const { authenticate } = require('../middleware/auth')
const { addChat } = require('../controller/message')



router.post('/api/chat', authenticate, addChat)
// router.post('/api/chat', (req, res) => {
//     const { message } = req.body
//     const socket_id = req.headers['x-socket-id']
//     pusher.trigger('chat-room', 'new-message', { message }, {socket_id})
//     res.send({msg : 'Message Send'})
// })

module.exports = router