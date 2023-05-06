require('../utils/db')

const Mongoose = require('mongoose')

const schema = new Mongoose.Schema({
    user1_id : {
        type : String,
        required : true,
    },
    user2_id : {
        type : String,
        required : true
    }
})

const model = Mongoose.model('conversations', schema)

module.exports = model