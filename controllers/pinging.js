const Ping = require('../models/Ping')
const errorHandler = require('../utils/errorHandler')


module.exports.pinging = async function (req, res) {
    let newDuration;
    try {
        const device = await Ping.find({deviceHash: req.body.deviceHash})
        console.log(device)
        if (device.length) {
        let date = Math.round(Date.now() / 60000)

            newDuration = date - device[0].startTime;
        }
            console.log(newDuration);
            const update = await Ping.findOneAndUpdate(
            {deviceHash: req.body.deviceHash},
             {duration: newDuration}
         )
            await res.status(200).json({
                status: true,
                duration: newDuration
            })
        } else {
        await res.status(200).json({status: false})
        }

    } catch (e) {
        errorHandler(res, e)
    }
}
