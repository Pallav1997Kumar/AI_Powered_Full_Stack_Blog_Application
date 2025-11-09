const BlogPost = require("../database-models/blogPost");
const BlogUser = require("../database-models/blogUser");
const BlogCategory = require("../database-models/blogCategory");


const searchUserOrCategoryOrBlog = async function(req, res, next){
    const searchText = req.query.searchText;

    if (!searchText || searchText.trim().length < 3) {
		return res.status(400).json({ error: "Search Text must be at least 3 characters long." });
	}

    const caseInsensitiveSearchText = new RegExp(searchText, "i");

    try {
        // Get user IDs who have at least one blog post
        const blogUsersId = await BlogPost.distinct("userID");

        const [blogPostTitleResults, blogCategoryResults, blogUserResults] = await Promise.all([
            BlogPost.find({
                postTitle: { $regex: caseInsensitiveSearchText } 
            })
                .limit(5)
                .select('_id postTitle'),

            BlogCategory.find({
                categoryName: { $regex: caseInsensitiveSearchText }
            })
                .limit(5)
                .select('_id categoryName'),

            BlogUser.find({
                 _id: { $in: blogUsersId },
                $or: [
                    { username: { $regex: caseInsensitiveSearchText } },
                    { fullName: { $regex: caseInsensitiveSearchText } }
                ]
            })
                .limit(5)
                .select('_id username fullName')
        ]); 

        let combinedPostTitleUserCategoryResults = [];

        blogPostTitleResults.forEach(function(eachPost){
            combinedPostTitleUserCategoryResults.push({
                type: "Blog Post",
                _id: eachPost._id,
                postTitle: eachPost.postTitle
            });
        });

        blogCategoryResults.forEach(function(eachCategory){
            combinedPostTitleUserCategoryResults.push({
                type: "Blog Category",
                _id: eachCategory._id,
                categoryName: eachCategory.categoryName
            });
        });

        blogUserResults.forEach(function(eachBlogUser){
            combinedPostTitleUserCategoryResults.push({
                type: "Blog User",
                _id: eachBlogUser._id,
                username: eachBlogUser.username,
                fullName: eachBlogUser.fullName
            });
        });

        combinedPostTitleUserCategoryResults = combinedPostTitleUserCategoryResults.slice(0, 5);

        return res.status(200).json(combinedPostTitleUserCategoryResults);
        
    } 
    catch (error) {
        console.log(error);
    }
}

module.exports = {
    searchUserOrCategoryOrBlog,
};