const conversationServie = require('../db/conversation')
const userService = require('../db/user')
const messageService = require('../db/message')

const findUser = async (req, res) => {
    const userId = req.user.id
    const users = await conversationServie.find(userId)

    const allUser = []
    for (const user of users) {
        const senderId = (user.user1_id !== req.user.id) ? user.user1_id : user.user2_id

        const sender = await userService.find(senderId)
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

    const chat = await messageService.findChat(id)
    return res.send({
        status : 'success',
        chat
    })
}

module.exports = {
    findUser,
    findChat
}