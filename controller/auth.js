// require('../utils/db')
// require('dotenv').config()
// const bcryptjs = require('bcryptjs')
// const { User } = require('../models/user')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userService = require('../db/user')
const conversationService = require('../db/conversation')

const login = async (req, res) => {
    const {username, password} = req.body
    const user = await userService.findWhere(username)

    if (!user) return res.status(404).send({
        status : 'fail',
        msg : 'User Not Found'
    })

    if (! await bcryptjs.compare(password, user.password)) return res.status(403).send({
        status : 'fail',
        msg : 'Password is Wrong'
    })

    const data = {
        id : user.id,
        username : user.username,
    }

    const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN)

    return res.send({
        status : 'success',
        data,
        accessToken
    })
}

const register = async (req, res) => {
    const {username, password} = req.body
    const salt = bcryptjs.genSaltSync(10)
    const newPassword = bcryptjs.hashSync(password, salt)

    const id = await userService.add(username, newPassword)
    return res.send({id})
    
}

const findUser = async (req, res) => {
    const {username} = req.query
    const user = await userService.findWhere(username)

    if (!user) return res.status(404).send({
        status : 'fail',
        msg : 'User Not Found'
    })

    const user1 = req.user.id
    const user2 = user.id

    const chatId = await conversationService.add(user1, user2)

    return res.send({
        status : 'success',
        data : chatId
    })
}

const logout =  async (req, res) => {
    
}

module.exports = {
    register,
    login,
    logout,
    findUser
}