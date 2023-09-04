const express = require('express')
const router = express.Router()
const { authenticate } = require('../middleware/auth')
const {
  addOnline,
  removeOnline,
  getOnline,
  auth,
} = require('../controller/status')

router.post('/api/status/online', authenticate, addOnline)
router.get('/api/status/get/:id', authenticate, getOnline)
router.post('/api/status/offline', authenticate, removeOnline)
router.post('/pusher/auth', auth)

module.exports = router
