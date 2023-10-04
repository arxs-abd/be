const Pusher = require('pusher')

const onlineUser = []
const pusher = new Pusher({
    appId : process.env.PUSHER_APP_ID,
    key : process.env.PUSHER_KEY,
    secret : process.env.PUSHER_SECRET,
    cluster : process.env.PUSHER_CLUSTER,
    useTLS : true
})

const createRoom = (req, res) => {
    return res.send({
        msg : 'Hello'
    })
}

module.exports = {createRoom}