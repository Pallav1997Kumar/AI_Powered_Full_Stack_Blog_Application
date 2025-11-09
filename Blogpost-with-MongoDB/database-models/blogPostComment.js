const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const blogPostCommentSchema = new Schema({
    commentDescription: {
        type: String,
        required: true
    },
    commentDateTime: {
        type: Date,
        required: true
    },
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

const BlogPostComment = mongoose.model('BLOGPOSTCOMMENT', blogPostCommentSchema);

module.exports = BlogPostComment;