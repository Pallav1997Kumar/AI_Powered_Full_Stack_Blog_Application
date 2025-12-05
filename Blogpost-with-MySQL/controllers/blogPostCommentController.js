const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { v4: uuidv4 } = require("uuid");

const db = require("../config/databaseConfig");

const { 
    INSERT_NEW_BLOG_COMMENT, 
    UPDATE_BLOG_COMMENT,
    DELETE_BLOG_COMMENT_BY_ID
} = require('../sqlQueries/blogPostCommentQuery');

const { GET_BLOG_POST_COMMENTS_JSON_ARRAY } = require("../sqlQueries/multipleTablesJoinQuery");


dotenv.config({path: "./config.env"});

const jwtPrivateKey = process.env.jwtPrivateKey;


//Adding new comment for particular post code starts
const addNewBlogComment = async function(req, res, next){
    try {
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

        // Verify JWT
        const userInformation = jwt.verify(token, jwtPrivateKey);
        const userID = userInformation.id;
        const commentID = uuidv4();

        const commentInsertValues = [commentID, newComment, postID, currentDate, userID];
        await db.query(INSERT_NEW_BLOG_COMMENT, commentInsertValues);
        return res.status(200).json("Commented on the post successfully");
    }
    catch (error){
        console.error(error);
        return res.status(500).json("Internal server error");
    }
}
//Adding new comment for particular post code ends


//Updating the comment code starts
const updateParticularComment = async function(req, res, next){
    try {
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

        const userInformation = jwt.verify(token, jwtPrivateKey);
        if (userInformation.id !== userID) {
            return res.status(401).json("Not Authenticated");
        }

        const updateCommentValues = [updatedComment, currentDate, commentID, userID];
        await db.query(UPDATE_BLOG_COMMENT, updateCommentValues);
        return res.status(200).json("Comment on the post updated successfully");
    }
    catch (error){
        console.error(error);
        return res.status(500).json("Internal server error");
    }
}
//Updating the comment code ends


//Delete the comment code starts
const deleteParticularComment = async function(req, res, next){
    try {
        const token = req.body.token || req.cookies.jwt_access_token;  
        if(!token){
            return res.status(401).json("Not Authenticated");
        }
        const commentID = req.params.commentID;
        const userID = req.body.userID;

        const userInformation = jwt.verify(token, jwtPrivateKey);
        if (userInformation.id !== userID) {
            return res.status(401).json("Not Authenticated");
        }

        const deleteCommentValues = [commentID, userID];
        await db.query(DELETE_BLOG_COMMENT_BY_ID, deleteCommentValues);
        return res.status(200).json("Comment on the post deleted successfully");
    }
    catch (error){
        console.error(error);
        return res.status(500).json("Internal server error");
    }
}
//Delete the comment code ends


//Get all Blog Post Comments for Particular Blog Post code starts
const getAllCommentsForParticularBlog = async function(req, res, next){
    try {
        const postID = req.params.postID;

        const commentResult = await db.query(GET_BLOG_POST_COMMENTS_JSON_ARRAY, [postID]);
        const commentRows = commentResult[0];

        // Parse JSON from SQL
        const comments = commentRows[0].comments ? JSON.parse(commentRows[0].comments) : [];

        return res.status(200).json(comments);
    }
    catch (error){
        console.error(error);
        return res.status(500).json("Internal server error");
    }
}
//Get all Blog Post Comments for Particular Blog Post code ends


module.exports = {
    addNewBlogComment,
    updateParticularComment,
    deleteParticularComment,
    getAllCommentsForParticularBlog
}