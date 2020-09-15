const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema ({
    userId: {
        type: String,
        required: true
    },
    deviceHash: Array
})


module.exports = mongoose.model('users', UserSchema)
