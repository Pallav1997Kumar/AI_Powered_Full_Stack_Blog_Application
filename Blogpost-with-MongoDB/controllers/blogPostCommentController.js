const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const BlogPostComment = require("../database-models/blogPostComment");

dotenv.config({path: "./config.env"});

const jwtPrivateKey = process.env.jwtPrivateKey;


//Adding new comment for particular post code starts
const addNewBlogComment = function(req, res, next){
    const token = req.body.token || req.cookies.jwt_access_token;  
    if(!token){
        return res.status(401).json("Not Authenticated");
    }
    const postID = req.params.postID;
    const currentDate = new Date(); 
    const newComment = req.body.newComment.trim();
    if(newComment === "" || newComment == null || newComment == undefined){
        return res.status(406).json("Blank comment cannot be added.");
    }
    jwt.verify(token, jwtPrivateKey, function(error, userInformation){
        const userID = userInformation.id;
        const newCommentObject = new BlogPostComment({
            commentDescription: newComment,
            commentDateTime: currentDate,
            userID: userInformation.id,
            postID: postID
        });
        newCommentObject.save()
        .then((result) => {
            return res.status(200).json("Commented on the post successfully");
        }).catch((err) => {
            console.log(err);
        });
    });
}
//Adding new comment for particular post code ends


//Updating the comment code starts
const updateParticularComment = function(req, res, next){
    const token = req.body.token || req.cookies.jwt_access_token;  
    if(!token){
        return res.status(401).json("Not Authenticated");
    }
    const commentID = req.params.commentID;
    const currentDate = new Date(); 
    const updatedComment = req.body.updatedComment.trim();
    const userID = req.body.userID;
    if(updatedComment === "" || updatedComment == null || updatedComment == undefined){
        return res.status(406).json("Blank comment cannot be added.");
    }
    jwt.verify(token, jwtPrivateKey, function(error, userInformation){
        if(userInformation.id != userID){
            return res.status(401).json("Not Authenticated");
        }
        const updateInfo = {
            commentDescription: updatedComment,
            commentDateTime: currentDate
        }
        BlogPostComment.findByIdAndUpdate(commentID, { $set: updateInfo })
        .then((result) => {
            return res.status(200).json("Comment on the post updated successfully");
        }).catch((err) => {
           console.log(err); 
        });
    });
}
//Updating the comment code ends


//Delete the comment code starts
const deleteParticularComment = function(req, res, next){
    const token = req.body.token || req.cookies.jwt_access_token;  
    if(!token){
        return res.status(401).json("Not Authenticated");
    }
    const commentID = req.params.commentID;
    const userID = req.body.userID;
    jwt.verify(token, jwtPrivateKey, function(error, userInformation){
        if(userInformation.id != userID){
            return res.status(401).json("Not Authenticated");
        }
        BlogPostComment.findByIdAndDelete(commentID)
        .then((result) => {
            return res.status(200).json("Comment on the post deleted successfully");
        }).catch((err) => {
            console.log(err);
        });
    });
}
//Delete the comment code ends


//Get all Blog Post Comments for Particular Blog Post code starts
const getAllCommentsForParticularBlog = function(req, res, next){
    const postID = req.params.postID;

    BlogPostComment.aggregate([
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
                commentDescription: 1,
                commentDateTime: 1,
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
//Get all Blog Post Comments for Particular Blog Post code ends


module.exports = {
    addNewBlogComment,
    updateParticularComment,
    deleteParticularComment,
    getAllCommentsForParticularBlog
}