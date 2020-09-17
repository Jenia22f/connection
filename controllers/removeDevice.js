const User = require('../models/User')
const Ping = require('../models/Ping')
const errorHandler = require('../utils/errorHandler');

module.exports.removeDevice = async function (req, res) {
    try {
        let status = false
    const user = await User.find({deviceHash: req.body.deviceHash})
        if (user.length) {
            status = true
            for(var i = user[0].deviceHash.length - 1; i >= 0; i--) {
                if(user[0].deviceHash[i] === req.body.deviceHash) {
                    user[0].deviceHash.splice(i, 1);
                }
            }
            const updateUser = await User.findOneAndUpdate(
                {deviceHash: req.body.deviceHash},
                {deviceHash: user[0].deviceHash}
            )
            await Ping.remove({deviceHash: req.body.deviceHash})
        }
        await res.status(200).json({status})
    } catch (e) {
        errorHandler(res, e)
    }
}
