// require('../utils/db')
// require('dotenv').config()
// const bcryptjs = require('bcryptjs')
// const { User } = require('../models/user')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const authService = require('../db/auth')

const login = async (req, res) => {
    const {username, password} = req.body
    const user = await authService.findWhere(username)

    if (! await bcryptjs.compare(password, user.password)) return res.status(403).send({
        status : 'error',
        msg : 'Password is Wrong'
    })

    const data = {
        id : user.id,
        username : user.username,
    }

    const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN)

    return res.send({
        data,
        accessToken
    })
}

const register = async (req, res) => {
    const {username, password} = req.body
    const salt = bcryptjs.genSaltSync(10)
    const newPassword = bcryptjs.hashSync(password, salt)

    const id = await authService.add(username, newPassword)
    return res.send({id})
    
}

const logout =  async (req, res) => {
    
}

module.exports = {
    register,
    login,
    logout
}