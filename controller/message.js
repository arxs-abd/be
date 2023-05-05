const Pusher = require('pusher')
const conversationServie = require('../db/conversation')
const userService = require('../db/user')
const messageService = require('../db/message')

const pusher = new Pusher({
    appId : '1590754',
    key : '914eb719506342bd7d28',
    secret : '414ef2d8654d3237e5aa',
    cluster : 'ap1',
    useTLS : true
})

const addChat = async (req, res) => {
    const {conversationId, id, message} = req.body
    const socket_id = req.headers['x-socket-id']
    const result = await messageService.add(conversationId, id, message)

    pusher.trigger('chat-room', conversationId, result, {socket_id})
    return res.send({
        status : 'success',
        message : result
    })
}

module.exports = {
    addChat
}