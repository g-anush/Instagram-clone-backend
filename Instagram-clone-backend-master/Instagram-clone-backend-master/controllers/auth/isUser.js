const Joi = require('joi')
const User = require('../../models/user')

const isUser = async(req,res,next)=>{
    console.log(req.query);
    const schema = Joi.object({
        userId:Joi.string().required()
    })

    const {error} = schema.validate(req.query)
    if(error){
        return next(error)
    }

    console.log("first")
    const user = await User.findOne({_id:req.query.userId})
    if(!user){
        return res.status(404).json({error:"User not found"})
    }
    const response = { 
        id:user._id,
        full_name:user.name,
        userName:user.userName,
        profileImageUrl:user.profileImageUrl
        
    }
    return res.status(200).json({user:response, status:"ok"})
}

module.exports = isUser