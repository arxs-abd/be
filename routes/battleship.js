const express = require('express')
const { createRoom, joinRoom, readyPlay, move, responseMove, deleteAllRoom } = require('../controller/battleship')
const router = express.Router()

router.post('/create-room', createRoom)
router.post('/join-room', joinRoom)
router.post('/ready', readyPlay)
router.post('/move', move)
router.post('/response-move', responseMove)
router.get('/delete-room', deleteAllRoom)

module.exports = router
