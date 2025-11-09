const express = require("express");
const { addNewBlogComment, updateParticularComment, deleteParticularComment, getAllCommentsForParticularBlog } = require("../controllers/blogPostCommentController");

const router = express.Router();


router.post("/newComment/:postID", addNewBlogComment);

router.put("/updateComment/:commentID", updateParticularComment);

router.delete("/deleteComment/:commentID", deleteParticularComment);

router.get("/:postID", getAllCommentsForParticularBlog);


module.exports = router;