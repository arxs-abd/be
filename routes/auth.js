const {login, logout, register} = require('../controller/auth')
const express = require('express')
const router = express.Router()

router.post('/api/login', login)
router.post('/api/register', register)
router.post('/api/logout', logout)

module.exports = router