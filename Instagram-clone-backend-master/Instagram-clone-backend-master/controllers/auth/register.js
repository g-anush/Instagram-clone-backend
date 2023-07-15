const express = require("express");
const router = express.Router();
const bycrypt = require("bcrypt");
const Joi = require("joi");
const User = require("../../models/user");

const registerUser = async (req, res, next) => {
  const userSchema = Joi.object({
    name: Joi.string().required(),
    userName: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
  });

  const { error } = userSchema.validate(req.body);
  if (error) {
    console.log(error)
    return next(error);
  }

  try {
    const { name,userName, email, password} = req.body;
    if(!email.includes("@")) {
      return res.status(400).json({ error: "Entered email address is not a valid email address." });
    }

    const isEmailExist = await User.exists({ email: email });
    if (isEmailExist) {
        return res.status(400).json({ error: "This user already exists." });
    } 
    const isUserNameExist = await User.exists({ userName: userName });
    if (isUserNameExist) {
        return res.status(400).json({ error: "This UserName already exists." });
    } 


    const hashedPassword = await bycrypt.hash(password, 12);
    User.create({ name: name,userName:userName, email: email, password: hashedPassword })
      .then(() => {
        return res.status(201).json({ message: "User created successfully" });
      })
      .catch((err) => {
        return res.status(500).json({ error: err.message });
      });
    
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

module.exports = registerUser;