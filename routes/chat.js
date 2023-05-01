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

router.post('/chat', (req, res) => {
    const { id, message } = req.body
    pusher.trigger('chat-room', 'new-message', {id, message})
    res.send('Message Send')
})

module.exports = router