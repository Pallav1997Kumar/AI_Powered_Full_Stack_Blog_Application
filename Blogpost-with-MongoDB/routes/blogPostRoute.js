const express = require("express");

const { 
    addNewBlogPost, 
    deleteParticularBlogPost, 
    updateParticularBlogPost, 
    getAllBlogPostWithUserAndCategoryInfo, 
    getFourBlogPostWithUserAndCategoryInfo, 
    getFourBlogPostWithUserAndCategoryInfoForParticularCategory, 
    getParticularBlogPostWithUserAndCategoryInfo,
    getBlogPostWithUserAndCategoryInfoWithPagination,
    getBlogPostWithUserAndCategoryInfoForParticularCategoryWithPagination,
    getBlogPostWithUserAndCategoryForParticularUserInfoWithPagination,
    getBlogPostedUniqueUsersDetails,
    getBlogPostedUniqueUsersDetailsForParticularCategory,
    getBlogPostedUniqueCategoriesDetails,
    getBlogPostedUniqueCategoriesDetailsForParticularUser,
    getBlogPostDetailsWithFilterSortWithPagination,
    getBlogPostDetailsWithFilterSortWithPaginationForParticularUser,
    getBlogPostDetailsWithFilterSortWithPaginationForParticularCategory
} = require("../controllers/blogPostController");


const router = express.Router();


router.get("/postId/:postID", getParticularBlogPostWithUserAndCategoryInfo);

router.post("/newPost/post", addNewBlogPost);

router.delete("/deletePost/:postID", deleteParticularBlogPost);

router.put("/updatePost/:postID", updateParticularBlogPost);


router.get("/postWithUserAndCategoryInfo", getAllBlogPostWithUserAndCategoryInfo);


router.get("/fourPostWithUserAndCategoryInfo", getFourBlogPostWithUserAndCategoryInfo);

router.get("/fourPostWithUserAndCategoryInfo/:categoryID", getFourBlogPostWithUserAndCategoryInfoForParticularCategory);


router.get("/postWithPaginationWithUserAndCategoryInfo", getBlogPostWithUserAndCategoryInfoWithPagination);

router.get("/postWithPaginationWithUserAndCategoryInfo/category/:categoryName", getBlogPostWithUserAndCategoryInfoForParticularCategoryWithPagination);

router.get("/postWithPaginationWithUserAndCategoryInfo/user/:username", getBlogPostWithUserAndCategoryForParticularUserInfoWithPagination);

router.get("/distinctBlogUsersInfo", getBlogPostedUniqueUsersDetails);

router.get("/distinctBlogUsersInfo/:categoryName", getBlogPostedUniqueUsersDetailsForParticularCategory);

router.get("/distinctBlogCategoriesInfo", getBlogPostedUniqueCategoriesDetails);

router.get("/distinctBlogCategoriesInfo/:username", getBlogPostedUniqueCategoriesDetailsForParticularUser);

router.post("/postWithFilterSortingPaginationWithUserAndCategoryInfo", getBlogPostDetailsWithFilterSortWithPagination);

router.post("/postWithFilterSortingPaginationWithUserAndCategoryInfo/user/:username", getBlogPostDetailsWithFilterSortWithPaginationForParticularUser);

router.post("/postWithFilterSortingPaginationWithUserAndCategoryInfo/category/:categoryName", getBlogPostDetailsWithFilterSortWithPaginationForParticularCategory);



module.exports = router;