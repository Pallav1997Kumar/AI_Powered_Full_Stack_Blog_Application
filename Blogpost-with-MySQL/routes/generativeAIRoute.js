const express = require("express");

const { 
    getBlogDescriptionSummary, 
    suggestBlogTitlesFromBlogDescription, 
    suggestBlogDescriptionsFromBlogTitle,
    enhanceBlogDescription
} = require("../controllers/generativeAIController");


const router = express.Router();


router.post("/summarizeBlogDescription", getBlogDescriptionSummary);

router.post("/suggestBlogTitlesFromBlogDescription", suggestBlogTitlesFromBlogDescription);

router.post("/suggestBlogDescriptionsFromTitle", suggestBlogDescriptionsFromBlogTitle);

router.post("/enhanceBlogDescription", enhanceBlogDescription);


module.exports = router;