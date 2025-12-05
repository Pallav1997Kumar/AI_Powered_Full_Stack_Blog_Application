const express = require("express");

const { 
    blogPostLike, 
    blogPostUnlike, 
    getAllLikesForParticularBlog 
} = require("../controllers/blogPostLikeController");

const router = express.Router();


router.post("/like/newLike/:postID", blogPostLike);

router.delete("/unlikePost/:postID", blogPostUnlike);

router.get("/:postID", getAllLikesForParticularBlog);


module.exports = router;