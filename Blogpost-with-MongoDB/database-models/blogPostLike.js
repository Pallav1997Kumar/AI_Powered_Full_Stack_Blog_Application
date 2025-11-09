const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const blogPostLikeSchema = new Schema({
    userID: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "BlogUser"
    },
    postID: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "BlogPost"
    }
});

const BlogPostLike = mongoose.model('BLOGPOSTLIKE', blogPostLikeSchema);

module.exports = BlogPostLike;