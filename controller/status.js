const Pusher = require('pusher')

const onlineUser = []
const pusher = new Pusher({
    appId : process.env.PUSHER_APP_ID,
    key : process.env.PUSHER_KEY,
    secret : process.env.PUSHER_SECRET,
    cluster : process.env.PUSHER_CLUSTER,
    useTLS : true
})

const addOnline = async (req, res) => {
    const {id, username} = req.body
    onlineUser.push({id, username})
    console.log(onlineUser)
    pusher.trigger('chat-room', 'online-user', onlineUser)
}

const getOnline = async (req, res) => {
    console.log(onlineUser)
    const userId = req.params
    const user = onlineUser.find((u) => u.id === userId) || []
    return res.send({
        status : 'success',
        user
    })
}
const removeOnline = async (req, res) => {
    console.log(onlineUser)
    const {id} = req.body
    onlineUser.filter(user => user.id !== userId)
    pusher.trigger('chat-room', 'offline-user', 'offline')
}

const auth = (req, res) => {
    const socketId = req.body.socket_id
    const channel = req.body.channel_name
    const user_id = req.body.user_id
    const username = req.body.username
    const presenceData = { user_id, userInfo : {username} }
    const authResponse = pusher.authorizeChannel(socketId, channel, presenceData)
    // console.log(authResponse)
    return res.send(authResponse)
}

module.exports = {addOnline, removeOnline, getOnline, auth}