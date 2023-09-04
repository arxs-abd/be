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

module.exports = { createChatAndTime }
