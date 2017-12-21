const mongoose = require('mongoose')
const Schema = mongoose.Schema


const UserSchema = new Schema({
    username: {
        type: String
    },
    googleId: {
        type: String
    },
    image: {
        type: String
    }
})

const User = mongoose.model('user', UserSchema)

module.exports = User