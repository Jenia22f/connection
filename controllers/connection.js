const User = require('../models/User')
const Ping = require('../models/Ping')
const errorHandler = require('../utils/errorHandler');

module.exports.connect = async function (req, res) {
    try {
        let status = false
        const candidate = await User.find({userId: req.body.userId});
        if (candidate) {
            const connect = candidate[0].deviceHash.find(el => el === req.body.deviceHash)
            if (connect) {
                status = true;
                const ping = new Ping({
                    userId: req.body.userId,
                    deviceHash: req.body.deviceHash,
                    startTime: Math.round(Date.now() / 60000),
                    duration: ''
                })
                await ping.save()
            } else {
                status = false;
            }
        } else {
            status = false
        }

        await res.status(200).json({
            status,
        })
    } catch (e) {
        errorHandler(res, e)
    }
}
