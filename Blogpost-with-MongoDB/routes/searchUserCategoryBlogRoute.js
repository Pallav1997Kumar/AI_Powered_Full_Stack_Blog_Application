const express = require("express");

const { searchUserOrCategoryOrBlog } = require("../controllers/searchUserCategoryBlogController");


const router = express.Router();


router.get("", searchUserOrCategoryOrBlog);


module.exports = router;