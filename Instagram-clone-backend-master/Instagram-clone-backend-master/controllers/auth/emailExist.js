const joi = require("joi")
const User = require("../../models/user")

const emailExist = async (req, res, next) => {
    const schema = joi.object({
        email: joi.string().required()
    })

    const { error } = schema.validate(req.body);
    if(error) {
        return next(error)
    }

    const userExist = await User.findOne({email:req.body.email});
    if(userExist){
        return res.status(200).json({message:true});
    }
    return res.status(200).json({message:false});
}

module.exports = emailExist