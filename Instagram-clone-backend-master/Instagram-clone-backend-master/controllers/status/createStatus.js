const Joi = require('joi')
const Status = require('../../models/status')
const User = require('../../models/user')

const createStatus = async (req, res, next) => {

    const schema = Joi.object({
        userId: Joi.string().required(),
        fileUrl: Joi.string().required(),
    })

    const { error } = schema.validate(req.body)
    if (error) {
        return next(error)
    }

    const { userId, fileUrl } = req.body;
    const user = await User.findById(userId)

    if (user) {
        Status.create({ userId: userId, fileUrl: fileUrl }).then(() => {
            return res.status(201).json({ message: "Status created successfully." });
        }).catch(err => {
            return res.status(500).json({ error: "Internal Server Error" })
        })
    } else {
        return res.status(404).json({ error: "User not found" })
    }
}

module.exports = createStatus

