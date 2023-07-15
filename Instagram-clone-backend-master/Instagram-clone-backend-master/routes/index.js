const express = require('express');
const router = express.Router();
const registerUser = require('../controllers/auth/register')
const loginUser = require('../controllers/auth/login')
const refresh = require('../controllers/auth/refresh')
const emailexist = require('../controllers/auth/emailExist')
const createPost = require("../controllers/post/createPost")
const getPost = require("../controllers/post/getPost")
const likes = require("../controllers/post/like")
const auth = require("../middleware/auth")
const userDetails = require("../controllers/auth/userDetails")
const isUser = require("../controllers/auth/isUser")
const createComment = require("../controllers/comments/createComment")
const getComment = require("../controllers/comments/getComments")
const getUserPosts = require("../controllers/post/getUserPost")
const followUser = require("../controllers/auth/follow")
const createStatus = require("../controllers/status/createStatus")
const getStatuses = require("../controllers/status/getStatus")
const profileImage = require("../controllers/auth/userPhoto")
const getSinglePost = require("../controllers/post/getOnePost")
const logout = require("../controllers/auth/logout")

router.get("/register",(req, res)=>{
    res.send("Register")
})

router.post("/user/register",registerUser);
router.post("/user/login", loginUser);
router.post("/user/refresh",refresh);
router.post("/user/emailexist",emailexist);
router.get("/user/profile/",userDetails);
router.get("/user/profile/isUser",[auth],isUser);
router.post("/user/follow",followUser)
router.post("/user/uploadProfilePic",profileImage.uploadImage)
router.post("/user/removeProfilePic",profileImage.removeImage)
router.post("/user/logout",logout)


router.post("/post/create",[auth],createPost)
router.get("/post/allPost/user=:userId&size=:size&nextToken=:nextToken",getPost)
router.post("/post/likes",[auth],likes)
router.get("/post/reels_tray",getUserPosts)
router.get("/post/get",getSinglePost)

router.post("/comment/create",createComment)
router.get("/comment/fetch",getComment)

router.post("/status/create",createStatus)
router.get("/status/fetch",getStatuses)

module.exports = router