const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {AccessToken} = require('livekit-server-sdk')

const User = require('../model/user')
const Conversation = require('../model/conversation')

const login = async (req, res) => {
  const { username, password } = req.body
  const user = await User.findOne({ username })

  if (!user)
    return res.status(403).send({
      status: 'fail',
      msg: 'Username not Found',
    })

  if (!(await bcryptjs.compare(password, user.password)))
    return res.status(403).send({
      status: 'fail',
      msg: 'Password is Wrong',
    })

  const data = {
    id: user._id,
    username: user.username,
  }

  const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN)

  return res.send({
    status: 'success',
    data,
    accessToken,
  })
}

const register = async (req, res) => {
  const { username, password } = req.body
  const salt = bcryptjs.genSaltSync(10)
  const newPassword = bcryptjs.hashSync(password, salt)

  const data = { username, password: newPassword }
  const newUser = new User(data)
  await newUser.save()
  return res.send({
    status: 'success',
    msg: 'User has been added',
  })
}

const findUser = async (req, res) => {
  const { username } = req.query

  const user = await User.findOne({ username })
  if (!user)
    return res.status(404).send({
      status: 'fail',
      msg: 'User Not Found',
    })

  const user1_id = req.user.id
  const user2_id = user.id

  const findDuplicate = await Conversation.find({
    $or: [
      {
        $and: [{ user1_id: user1_id }, { user2_id: user2_id }],
      },
      {
        $and: [{ user1_id: user2_id }, { user2_id: user1_id }],
      },
    ],
  })

  // return console.log({findDuplicate})
  if (findDuplicate.length > 0)
    return res.status(400).send({
      status: 'fail',
      msg: 'User Telah Ditambahkan',
    })
  const data = { user1_id, user2_id }
  const chatId = new Conversation(data)

  await chatId.save()

  return res.send({
    status: 'success',
    data: chatId._id,
  })
}

const getToken = async (req, res) => {
    const roomName = '1234';
    const participantName = + new Date() + '';

    const at = new AccessToken('APITsSwMkLjKKaE', 'UAUr1TLqcIiUsobmQyoO5pW192ITUZeCFGalJzLQOhR', {
      identity: participantName,
    });
    at.addGrant({ roomJoin: true, room: roomName });

    return res.send({
      token : at.toJwt() 
    })
}

const logout = async (req, res) => {}

module.exports = {
  register,
  login,
  logout,
  findUser,
  getToken
}
