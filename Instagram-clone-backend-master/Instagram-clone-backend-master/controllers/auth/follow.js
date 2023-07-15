const Joi = require('joi')
const User = require('../../models/user')
const Follow = async (req, res, next) => {
    const schema = Joi.object({
        userId: Joi.string().required(),
        followUserId: Joi.string().required(),
        status: Joi.boolean().required()
    })

    const { error } = schema.validate(req.body);
    if (error) {
        return next(error)
    }

    const { userId, followUserId, status } = req.body

    const user = await User.findOne({ _id: userId })
    const followUser = await User.findOne({ _id: followUserId })

    if (user && followUser) {
        if (status === true){
            let userFollowingArray = user.following;
            let followUserFollowers = followUser.followers;
            userFollowingArray.push(followUserId)
            followUserFollowers.push(userId)

            User.findByIdAndUpdate({ _id: userId }, { following: userFollowingArray },
                function (err, result) {
                    if (err) {
                        return res.status(500).json({ error: "Internal Server Error" })
                    }
                }
            )

            User.findByIdAndUpdate({ _id: followUserId }, { followers: followUserFollowers },
                function (err, result) {
                    if (err) {
                        return res.status(500).json({ error: "Internal Server Error" })
                    }
                }
            )

            return res.status(200).json({message:"Success"});

        } else {
            let userFollowingArray = user.following;
            let followUserFollowers = followUser.followers;
            userFollowingArray = userFollowingArray.filter(function(value, index, arr){ 
                return value!=followUserId;
            });
            followUserFollowers = followUserFollowers.filter(function(value, index, arr){ 
                return value !=userId;
            });

            User.findByIdAndUpdate({ _id: userId }, { following: userFollowingArray },
                function (err, result) {
                    if (err) {
                        return res.status(500).json({ error: "Internal Server Error" })
                    }
                }
            )

            User.findByIdAndUpdate({ _id: followUserId }, { followers: followUserFollowers },
                function (err, result) {
                    if (err) {
                        return res.status(500).json({ error: "Internal Server Error" })
                    }
                }
            )

            return res.status(200).json({message:"Success"});
        }
    } else {
        return res.status(404).json({ error: "User not found" })
    }
}

module.exports = Follow