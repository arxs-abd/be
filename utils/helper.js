const createChatAndTime = (message) => {
  const result = {}

  for (const chat of message) {
    const date = new Date(chat.created_at)
    const day = date.getDate()
    const month = Number(date.getMonth()) + 1
    const year = date.getFullYear()
    const newDate = new Date(`${year}-${month}-${day}`)

    if (!result[newDate]) result[newDate] = []
    result[newDate].push(chat)
  }

  return result
}

const generateRandomString = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let result = ''
    const charactersLength = characters.length

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charactersLength)
        result += characters.charAt(randomIndex)
    }

    return result
}

const delay = (time) => {
  return new Promise(resolve => {
    setTimeout(resolve, time)
  })
}


module.exports = { createChatAndTime, generateRandomString, delay }
