const express = require('express')
const router = express.Router()
const Pusher = require('pusher')

const pusher = new Pusher({
    appId : '1590754',
    key : '914eb719506342bd7d28',
    secret : '414ef2d8654d3237e5aa',
    cluster : 'ap1',
    useTLS : true
})

router.post('/api/chat', (req, res) => {
    const { id, message } = req.body
    const socket_id = req.headers['x-socket-id']
    pusher.trigger('chat-room', 'new-message', {id, message}, {socket_id})
    res.send({msg : 'Message Send'})
})

module.exports = router