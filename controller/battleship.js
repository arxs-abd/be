const Pusher = require('pusher')
const { generateRandomString } = require('../utils/helper')

const allRoom = {}
const MAX_ROOM = 25
const pusher = new Pusher({
    appId : process.env.PUSHER_APP_ID,
    key : process.env.PUSHER_KEY,
    secret : process.env.PUSHER_SECRET,
    cluster : process.env.PUSHER_CLUSTER,
    useTLS : true
})

const createRoom = async (req, res) => {
    const { username } = req.body
    let roomId = generateRandomString(10)
    let id = generateRandomString(4)
    while (allRoom[roomId]) {
        roomId = generateRandomString(10)
    }
    if (Object.keys(allRoom).length > MAX_ROOM) {
        return res.send({
            msg : 'Room Sudah Penuh, Silahkan Coba Lagi'
        })
    }

    allRoom[roomId] = {
        player1 : {
            id,
            username,
            status : 'not-ready'
        }
    }

    return res.send({
        msg : 'Berhasil Membuat Room',
        roomId,
        id
    })
}

const joinRoom = async (req, res) => {
    const {roomId, username} = req.body

    if (!allRoom[roomId]) return res.send({
        room : 0,
        msg : 'Room Tidak ditemukan'
    })

    if (Object.keys(allRoom[roomId]).length > 1) return res.send({
        room : 0,
        msg : 'Room Sudah Penuh',
    })
    
    const id = generateRandomString(4)
    allRoom[roomId].player2 = {
        id,
        username,
        status : 'not-ready',
    }
    const data = {
        id,
        msg : 'Anda Sudah Mempunyai Lawan'
    }
    pusher.trigger('battleship-room-' + roomId, 'join', data)
    return res.send({
        id,
        msg : 'Berhasil Bergabung di Room',
    })
}

const readyPlay = async (req, res) => {
    const {roomId, id} = req.body
    const socket_id = req.headers['x-socket-id']

    if (allRoom[roomId].player1.id === id) {
        allRoom[roomId].player1.status = 'ready'
        
        if (allRoom[roomId].player2.status === 'ready') {
            const data = {
                id : allRoom[roomId].player1.id,
                msg : 'Menunggu Lawan'
            }
            pusher.trigger('battleship-room-' + roomId, 'start', data, { socket_id })
            return res.send({
                msg : 'Memulai Game',
                status : 'play'
            })
        }
        const data = {
            id : allRoom[roomId].player1.id,
            msg : 'Lawan Anda Sudah Siap'
        }
        pusher.trigger('battleship-room-' + roomId, 'opponent-ready', data, { socket_id })
        return res.send({
            msg : 'Menunggu Lawan Siap'
        })
        
    } else if (allRoom[roomId].player2.id === id) {
        allRoom[roomId].player2.status = 'ready'
        
        if (allRoom[roomId].player1.status === 'ready') {
            const data = {
                id : allRoom[roomId].player2.id,
                msg : 'Menunggu Lawan'
            }
            pusher.trigger('battleship-room-' + roomId, 'start', data, { socket_id })
            return res.send({
                msg : 'Memulai Game',
                status : 'play'
            })
        }
        const data = {
            id : allRoom[roomId].player2.id,
            msg : 'Lawan Anda Sudah Siap'
        }
        pusher.trigger('battleship-room-' + roomId, 'opponent-ready', data, { socket_id })
        return res.send({
            msg : 'Menunggu Lawan Siap'
        })
    }
    return res.send({
        msg : 'ID Tidak Ditemukan'
    })
}

const move = async (req, res) => {
    const {roomId, attack, id} = req.body

    if (!allRoom[roomId]) return res.send({
        msg : 'Room Tidak Ditemukan'
    })
    const data = {
        id, attack
    }
    pusher.trigger('battleship-room-' + roomId, 'attack', data)

    return res.send({roomId, attack, id})
}

const responseMove = async (req, res) => {
    const {id, position, result, roomId} = req.body
    const data = {id, position, result}
    pusher.trigger('battleship-room-' + roomId, 'attack-response', data)
}

const deleteAllRoom = async (req, res) => {
    allRoom = {}
}

module.exports = {createRoom, joinRoom, readyPlay, move, responseMove, deleteAllRoom}