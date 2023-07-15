const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    postUserId: { type: 'string', required: true },
    postFileUrl: { type: 'string', required: true },
    postLikesCount: { type: 'Number', required: true },
    postLikeUserIds: { type: Array },
    postType: { type: 'string', required: true },
    slug: { type: 'string', required: true },
},
    { timestamps: true })

module.exports = mongoose.model('posts', postSchema)