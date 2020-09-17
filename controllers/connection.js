const User = require('../models/User')
const Ping = require('../models/Ping')
const errorHandler = require('../utils/errorHandler');

module.exports.connect = async function (req, res) {
    try {
        let status = false
        const findDevice = await User.find({deviceHash: req.body.deviceHash});

        if (!findDevice.length) {

            const candidate = await User.find({userId: req.body.userId});

            if (candidate.length) {
                status = true;
                candidate[0].deviceHash.push(req.body.deviceHash)

                const updateUser = await User.findOneAndUpdate(
                    {userId: req.body.userId},
                    {deviceHash: candidate[0].deviceHash}
                )

                const ping = new Ping({
                    userId: req.body.userId,
                    deviceHash: req.body.deviceHash,
                    startTime: Math.round(Date.now() / 60000),
                    duration: ''
                })
                await ping.save()
            }
        }

        await res.status(200).json({
            status
        })
    } catch (e) {
        errorHandler(res, e)
    }
}
