const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const BlogPostLike = require("../database-models/blogPostLike");


dotenv.config({path: "./config.env"});

const jwtPrivateKey = process.env.jwtPrivateKey;


//Liking the post code starts
const blogPostLike = function(req, res, next){
    const token = req.body.token || req.cookies.jwt_access_token;  
    if(!token){
        return res.status(401).json("Not Authenticated");
    }
    const postID = req.params.postID;
    jwt.verify(token, jwtPrivateKey, function(error, userInformation){
        const userID = userInformation.id;
        const newBlogLike = new BlogPostLike({
            userID: userID,
            postID: postID
        });
        newBlogLike.save()
        .then((result) => {
            return res.status(200).json("Liked the post successfully");
        }).catch((err) => {
            console.log(err);
        });
    });
}
//Liking the post code ends


//Unliking the post code starts
const blogPostUnlike = function(req, res, next){
    const token = req.body.token || req.cookies.jwt_access_token;  
    if(!token){
        return res.status(401).json("Not Authenticated");
    }
    const postID = req.params.postID;
    jwt.verify(token, jwtPrivateKey, function(error, userInformation){
        console.log(userInformation)
        const userID = userInformation.id;
        BlogPostLike.findOneAndDelete({
            postID: postID,
            userID: userID
        })
        .then((result) => {
            if (!result) {
                return res.status(404).json("Like not found");
            }
            return res.status(200).json("Unliked the post successfully");
        }).catch((err) => {
            console.log(err);
        });
    });
}
//Unliking the post code ends


//Get all Blog Post Likes for Particular Blog Post code starts
const getAllLikesForParticularBlog = function(req, res, next){
    const postID = req.params.postID;

    BlogPostLike.aggregate([
        {
            $match: {
                postID: new mongoose.Types.ObjectId(postID) 
            }
        },
        {
            $lookup: {
                from: "blogusers",
                localField: "userID",
                foreignField: "_id",
                as: "userDetails"
            }
        },
        {
            $unwind: '$userDetails'
        },
        {
            $project: {
                _id: 1,
                userID: 1,
                postID: 1,
                'userDetails.fullName': 1,
                'userDetails.username': 1,
                'userDetails.userProfilePhoto': 1,
            }
        }
    ])
    .then((result) => {
        return res.status(200).json(result);
    })
    .catch((err) => {
        console.log(err);
    });
}
//Get all Blog Post Likes for Particular Blog Post code ends


module.exports = {
    blogPostLike,
    blogPostUnlike,
    getAllLikesForParticularBlog
};