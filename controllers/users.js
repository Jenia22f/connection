const User = require('../models/User')
const errorHandler = require('../utils/errorHandler');


module.exports.getUser = async function (req, res) {
    try {
        const candidate = await User.find({userId: req.body.userId});
        if (candidate) {
            await res.status(200).json(candidate[0].deviceHash)
        } else {
            await res.status(200).json({
                status: false
            })
        }

    } catch (e) {
        errorHandler(res, e)
    }
}
