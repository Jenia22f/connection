const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PingSchema = new Schema ({
    userId: {
        type: String,
    },
    deviceHash: {
        type: String,
        required: true
    },
    startTime: {
        type: Number
    },
    duration: {
        type: Number
    }
})


module.exports = mongoose.model('pings', PingSchema)
