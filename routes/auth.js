const {login, logout, register, findUser, getToken, } = require('../controller/auth')
const express = require('express')
const { authenticate } = require('../middleware/auth')
const router = express.Router()

router.post('/api/login', login)
router.get('/api/getToken', getToken)
router.post('/api/register', register)
router.post('/api/logout', logout)
router.get('/api/conversation/find', authenticate, findUser)

module.exports = router