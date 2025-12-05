const db = require("../config/databaseConfig");

const { 
    GET_DISTINCT_USER_IDS_FROM_BLOG_POST, 
    GET_BLOG_POSTS_JSON_ARRAY_FOR_SEARCH 
} = require("../sqlQueries/blogPostQuery");

const { GET_BLOG_CATEGORIES_JSON_ARRAY_FOR_SEARCH } = require("../sqlQueries/blogCategoryListQuery");
const { GET_BLOG_USERS_JSON_ARRAY_FOR_SEARCH } = require("../sqlQueries/blogUserQuery");


const searchUserOrCategoryOrBlog = async function(req, res, next){
    const searchText = req.query.searchText;

    if (!searchText || searchText.trim().length < 3) {
		return res.status(400).json({ error: "Search Text must be at least 3 characters long." });
	}

    try {
        const likePattern = `%${searchText}%`;

        const blogUsersIdResult = await db.query(GET_DISTINCT_USER_IDS_FROM_BLOG_POST);
        const blogUsersId = blogUsersIdResult[0].map(function(row) {
            return row.USER_ID;
        });

        // Execute queries in parallel
        const [blogPostTitleResults, blogCategoryResults, blogUserResults] = await Promise.all([
            db.query(GET_BLOG_POSTS_JSON_ARRAY_FOR_SEARCH, [likePattern]),
            db.query(GET_BLOG_CATEGORIES_JSON_ARRAY_FOR_SEARCH, [likePattern]),
            db.query(GET_BLOG_USERS_JSON_ARRAY_FOR_SEARCH, [blogUsersId, likePattern, likePattern])
        ]);

        let combinedPostTitleUserCategoryResults = [];

        const blogPostTitleResultsArray = blogPostTitleResults[0][0].results ? JSON.parse(blogPostTitleResults[0][0].results) : [];
        const blogCategoryResultsArray = blogCategoryResults[0][0].results ? JSON.parse(blogCategoryResults[0][0].results) : [];
        const blogUserResultsArray = blogUserResults[0][0].results ? JSON.parse(blogUserResults[0][0].results) : [];

        blogPostTitleResultsArray.forEach(function(eachPost){
            combinedPostTitleUserCategoryResults.push(eachPost);
        });

        blogCategoryResultsArray.forEach(function(eachCategory){
            combinedPostTitleUserCategoryResults.push(eachCategory);
        });

        blogUserResultsArray.forEach(function(eachBlogUser){
            combinedPostTitleUserCategoryResults.push(eachBlogUser);
        });

        combinedPostTitleUserCategoryResults = combinedPostTitleUserCategoryResults.slice(0, 5);

        return res.status(200).json(combinedPostTitleUserCategoryResults);
    } 
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" });

    }
}

module.exports = {
    searchUserOrCategoryOrBlog,
};