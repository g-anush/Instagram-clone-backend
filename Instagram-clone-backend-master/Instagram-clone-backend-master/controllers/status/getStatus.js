const Joi = require('joi')
const Status = require('../../models/status')
const User = require('../../models/user')

const getStatus = async (req, res, next) => {

    const schema = Joi.object({
        userId: Joi.string().required(),
    })

    const { error } = schema.validate(req.query)
    if (error) {
        return next(error)
    }

    const { userId } = req.query;

    const user = await User.findOne({ _id: userId })
    if (!user) {
        return res.status(401).json({ error: "User not found" })
    }

    following = user.following;
    following = [userId, ...following]
    let resDoc = [];
    for (const id of following) {
        const document = await Status.find({ userId: id })
        if (document && document.length > 0) {
            const user_info = await User.findOne({ _id: id })
            if (user_info) {
                resultObj = {
                    userId: id,
                    userName: user_info.userName,
                    profileImage: user_info.profileImageUrl,
                }
                statusFilesUrl = []
                for (const doc of document) {
                    statusFilesUrl.push(doc.fileUrl)
                }
                resultObj = { ...resultObj, statusUrls: statusFilesUrl }
                resDoc.push(resultObj)
            }

        }
    }

    return res.status(200).json({ status: resDoc })
}

module.exports = getStatus


