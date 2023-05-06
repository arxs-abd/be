require('../utils/db')

const Mongoose = require('mongoose')

const schema = new Mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    }
})

const User = Mongoose.model('users', schema)

module.exports = User