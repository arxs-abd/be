const jwt = require('jsonwebtoken')

const authenticate = (req, res, next) => {
  const bearerToken = req.headers.authorization
  // console.log(bearerToken)
  const token = bearerToken.split(' ')[1]

  if (!token)
    return res.status(401).send({
      status: 'error',
      msg: 'Token Not Found',
    })

  jwt.verify(token, process.env.ACCESS_TOKEN, (err, result) => {
    // console.log(token)
    if (err)
      return res.status(403).send({
        status: 'error',
        msg: 'The token you entered is invalid or has expired. Please try again with a valid token.',
      })
    req.user = result
    next()
  })
}

module.exports = {
  authenticate,
}
