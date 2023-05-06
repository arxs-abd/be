const User = require('../model/user')
const Conversation = require('../model/conversation')
const Message = require('../model/message')

const findUser = async (req, res) => {
    const userId = req.user.id
    const users = await Conversation.find({
        $or : [
            {user1_id : userId},
            {user2_id : userId},
        ]
    })

    const allUser = []

    for (const user of users) {
        const senderId = (user.user1_id !== req.user.id) ? user.user1_id : user.user2_id
        const sender = await User.findById(senderId)
        const data = {
            id_chat : user.id,
            sender : {
                id : senderId,
                username : sender.username
            },
            created_at : user.created_at
        }
        allUser.push(data)
    }
    

    return res.send({
        status : 'success',
        data : allUser
    })
}

const findChat = async (req, res) => {
    const {id} = req.params

    const chat = await Message.find({conversation_id : id})
    return res.send({
        status : 'success',
        chat
    })
}

module.exports = {
    findUser,
    findChat
}