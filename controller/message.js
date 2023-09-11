const Pusher = require('pusher')
const {AccessToken} = require('livekit-server-sdk')
const Messages = require('../model/message')
const Conversation = require('../model/conversation')
const { createChatAndTime } = require('../utils/helper')
const User = require('../model/user')

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  useTLS: true,
})

const addChat = async (req, res) => {
  const { conversationId, id, message } = req.body
  const socket_id = req.headers['x-socket-id']
  const data = {
    conversation_id: conversationId,
    sender_id: id,
    message,
    created_at: new Date().toISOString(),
  }

  const result = new Messages(data)
  await result.save()

  pusher.trigger('presence-chat-room', conversationId, result, { socket_id })
  return res.send({
    status: 'success',
    message: result,
  })
}

const getAllChat = async (req, res) => {
  const userId = req.user.id

  const getAllConversationByUser = await Conversation.find({
    $or: [{ user1_id: userId }, { user2_id: userId }],
  })

  const allMessage = {}
  for (const conversation of getAllConversationByUser) {
    const conversationId = conversation._id
    const message = await Messages.find({
      conversation_id: conversationId,
    })
    const result = createChatAndTime(message)
    allMessage[conversationId] = result
  }

  return res.send({
    msg: 'success',
    allMessage,
  })
}

const createCall = async (req, res) => {
  const { conversationId, id } = req.body
  const socket_id = req.headers['x-socket-id']
  const user = await User.findById(id)
  const data = {
    // user,
    sender_id: id,
    user : user.username
  }

  pusher.trigger('presence-call-room', conversationId, data, { socket_id })
  return res.send({
    status: 'success',
    message: data,
  })
}

const getToken = (req, res) => {
  const {roomName, name} = req.body

  const at = new AccessToken(process.env.LIVEKIT_KEY, process.env.LIVEKIT_SERVER, {
    identity: name,
  })
  at.addGrant({ roomJoin: true, room: roomName })
    res.send({
        token : at.toJwt()
    });
}

module.exports = {
  addChat,
  getAllChat,
  createCall,
  getToken
}
