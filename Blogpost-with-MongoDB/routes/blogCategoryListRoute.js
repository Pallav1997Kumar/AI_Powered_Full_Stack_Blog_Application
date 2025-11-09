const express = require("express");
const { getAllBlogCategoryList } = require("../controllers/blogCategoryListController");


const router = express.Router();


router.get("/", getAllBlogCategoryList);


module.exports = router;