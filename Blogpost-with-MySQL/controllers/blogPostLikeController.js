const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { v4: uuidv4 } = require("uuid");


const { 
    INSERT_NEW_BLOG_LIKE, 
    CHECK_BLOG_LIKE_BY_USER_ID_AND_POST_ID,
    DELETE_BLOG_LIKE_BY_POST_ID_AND_USER_ID
} = require("../sqlQueries/blogPostLikeQuery");

const { GET_BLOG_POST_LIKES_JSON_ARRAY } = require("../sqlQueries/multipleTablesJoinQuery");


dotenv.config({path: "./config.env"});

const jwtPrivateKey = process.env.jwtPrivateKey;


//Liking the post code starts
const blogPostLike = async function(req, res, next){
    try {
        const token = req.body.token || req.cookies.jwt_access_token;  
        if(!token){
            return res.status(401).json("Not Authenticated");
        }
        const postID = req.params.postID;

        const userInformation = jwt.verify(token, jwtPrivateKey);
        const userID = userInformation.id;
        const likeID = uuidv4();

        await db.query(INSERT_NEW_BLOG_LIKE, [likeID, postID, userID]);
        return res.status(200).json("Liked the post successfully");
    }
    catch (error){
        console.error(error);
        return res.status(500).json("Internal server error");
    }
}
//Liking the post code ends


//Unliking the post code starts
const blogPostUnlike = async function(req, res, next){
    try {
        const token = req.body.token || req.cookies.jwt_access_token;  
        if(!token){
            return res.status(401).json("Not Authenticated");
        }
        const postID = req.params.postID;

        const userInformation = jwt.verify(token, jwtPrivateKey);
        const userID = userInformation.id;

        const likeResult = await db.query(CHECK_BLOG_LIKE_BY_USER_ID_AND_POST_ID, [postID, userID]);
        const likeRows = likeResult[0];
        if (likeRows.length === 0) {
            return res.status(404).json("Like not found");
        }

        await db.query(DELETE_BLOG_LIKE_BY_POST_ID_AND_USER_ID, [postID, userID]);
        return res.status(200).json("Unliked the post successfully");
    }
    catch (error){
        console.error(error);
        return res.status(500).json("Internal server error");
    }
}
//Unliking the post code ends


//Get all Blog Post Likes for Particular Blog Post code starts
const getAllLikesForParticularBlog = async function(req, res, next){
    try {
        const postID = req.params.postID;

        const likeResult = await db.query(GET_BLOG_POST_LIKES_JSON_ARRAY, [postID]);
        const likeRows = likeResult[0];

        // Parse JSON from SQL
        const likes = likeRows[0].likes ? JSON.parse(likeRows[0].likes) : [];

        return res.status(200).json(likes);
    }
    catch (error){
        console.error(error);
        return res.status(500).json("Internal server error");
    }
}
//Get all Blog Post Likes for Particular Blog Post code ends


module.exports = {
    blogPostLike,
    blogPostUnlike,
    getAllLikesForParticularBlog
};