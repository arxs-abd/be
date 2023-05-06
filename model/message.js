require('../utils/db')

const Mongoose = require('mongoose')

const schema = new Mongoose.Schema({
    conversation_id : {
        type : String,
        required : true,
    },
    sender_id : {
        type : String,
        required : true
    },
    message : {
        type : String,
        required : true
    },
    created_at : {
        type : String,
        required : true
    },
})

const model = Mongoose.model('messages', schema)

module.exports = model