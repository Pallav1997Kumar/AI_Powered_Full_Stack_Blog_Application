const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const blogPostSchema = new Schema({
    postTitle: {
        type: String,
        required: true
    },
    postDescription: {
        type: String,
        required: true
    },
    categoryID: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "BlogCategory"
    },
    userID: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "BlogUser"
    },
    postImage: {
        type: String,
        required: true
    },
    postDateTime: {
        type: Date,
        required: true
    },
    postStatus: {
        type: String,
        required: true
    }
});

const BlogPost = mongoose.model('BLOGPOST', blogPostSchema);

module.exports = BlogPost;