const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const blogUserSchema = new Schema({
    firstName:{
        type: String,
        required: true,
        maxLength: 50
    },
    middleName: {
        type: String,
        required: false,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        maxLength: 50
    },
    fullName: {
        type: String,
        required: true,
        maxLength: 150
    },
    username:{
        type: String,
        required: true,
        maxLength: 50,
        unique: true
    },
    emailAddress:{
        type: String,
        required: true,
        maxLength: 50,
        unique: true
    },
    gender: {
        type: String,
        required: true,
        maxLength: 10
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    password: {
        type: String,
        required: true,
        maxLength: 50,
    },
    userProfilePhoto: {
        type: String,
        required: true,
    }
});

const BlogUser = mongoose.model('BLOGUSERS', blogUserSchema);

module.exports = BlogUser;