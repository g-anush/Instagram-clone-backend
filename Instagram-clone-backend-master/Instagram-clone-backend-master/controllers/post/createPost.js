const Joi = require('joi');
const user = require('../../models/user')
const post = require('../../models/post')
const {v4: uuidv4}  = require("uuid")

const createPost = async(req, res, next) => {
    const postSchema = Joi.object({
        postUserId: Joi.string().required(),
        postFileUrl: Joi.string().required(),
        postLikesCount: Joi.number().required(),
        postLikeUserIds: Joi.array().required(),
        postType: Joi.string().required()
    })

    console.log("object");
    const { error } = postSchema.validate(req.body);
    if (error) {
        return next(error);
    }

    const userId = req.body.postUserId;
    const userExist = await user.exists({_id:userId});
    if(!userExist) {
        return res.status(400).json({error: 'User not found'});
    }
    const {postUserId,postFileUrl,postLikesCount,postLikeUserIds,postType}=req.body
    post.create({postUserId,postFileUrl,postLikesCount,postLikeUserIds,postType,slug:uuidv4()})
        .then(()=>{
            return res.status(201).json({message:"Post created successfully"})
        }).catch(error=>{
            console.log(error)
            return res.status(500).json({error: "Internalq Server Error"})
        })
}

module.exports = createPost