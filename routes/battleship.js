const express = require('express')
const { createRoom, joinRoom, readyPlay, move, responseMove, deleteAllRoom, leftRoom, getAllRoom } = require('../controller/battleship')
const { auth } = require('../controller/status')
const router = express.Router()

router.post('/create-room', createRoom)
router.post('/join-room', joinRoom)
router.post('/ready', readyPlay)
router.post('/move', move)
router.post('/left-room', leftRoom)
router.post('/response-move', responseMove)
router.get('/delete-room', deleteAllRoom)
router.get('/room', getAllRoom)
router.post('/auth', auth)

module.exports = router
