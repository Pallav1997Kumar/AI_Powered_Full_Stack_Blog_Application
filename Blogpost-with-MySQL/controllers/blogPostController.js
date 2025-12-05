const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { v4: uuidv4 } = require("uuid");


const db = require("../config/databaseConfig");

const { 
    INSERT_NEW_BLOG_POST, 
    CHECK_USER_POST_OWNERSHIP,
    DELETE_BLOG_POST_BY_ID,
    UPDATE_BLOG_POST_WITH_IMAGE,
    UPDATE_BLOG_POST_NO_IMAGE,
    GET_DISTINCT_USER_IDS_FROM_BLOG_POST,
    GET_DISTINCT_USER_IDS_BY_CATEGORY_ID_FROM_BLOG_POST,
    GET_DISTINCT_CATEGORY_IDS_FROM_BLOG_POST,
    GET_DISTINCT_CATEGORY_IDS_BY_USER_ID_FROM_BLOG_POST
} = require('../sqlQueries/blogPostQuery');

const { 
    GET_CATEGORY_ID_BY_CATEGORY_NAME, 
    GET_CATEGORIES_DETAILS_BY_CATEGORY_IDS 
} = require("../sqlQueries/blogCategoryListQuery");

const { 
    GET_USERS_DETAILS_BY_USER_IDS, 
    GET_USER_ID_BY_USERNAME 
} = require("../sqlQueries/blogUserQuery");

const { 
    GET_BLOG_POSTS_JSON_ARRAY, 
    GET_BLOG_POSTS_SUMMARY_JSON_ARRAY, 
    GET_BLOG_POSTS_BY_CATEGORY_JSON_ARRAY,
    GET_BLOG_POST_BY_ID_JSON_ARRAY,
    GET_BLOG_POSTS_WITH_PAGINATION_JSON_ARRAY,
    GET_BLOG_POSTS_BY_CATEGORY_PAGINATED_JSON,
    GET_BLOG_POSTS_BY_USER_PAGINATED_JSON,
    GET_BLOG_POSTS_BY_CATEGORY_AUTHOR_DATE,
    GET_BLOG_POSTS_BY_CATEGORY_AUTHOR,
    GET_BLOG_POSTS_BY_AUTHOR_DATE,
    GET_BLOG_POSTS_BY_CATEGORY_DATE,
    GET_BLOG_POSTS_BY_CATEGORY_ONLY,
    GET_BLOG_POSTS_BY_AUTHOR_ONLY,
    GET_BLOG_POSTS_BY_DATE_ONLY,
    GET_BLOG_POSTS_NO_FILTERS
} = require("../sqlQueries/multipleTablesJoinQuery");

const { DELETE_ALL_BLOG_COMMENT_BY_POST_ID } = require('../sqlQueries/blogPostCommentQuery');
const { DELETE_BLOG_LIKE_BY_POST_ID } = require("../sqlQueries/blogPostLikeQuery");



dotenv.config({path: "./config.env"});

const jwtPrivateKey = process.env.jwtPrivateKey;


//Adding blog post code starts
const addNewBlogPost = async function(req, res, next) {
    try {
        const title = req.body.title;
        const postDescription = req.body.postDescription;
        const category = req.body.category;
        const imageDetail = req.body.imageDetail;
        if(imageDetail === ""){
            return res.status(417).json("Please upload the image");
        }
        const token = req.body.token || req.cookies.jwt_access_token;
        if(!token){
            return res.status(401).json("Not Authenticated");
        }

        const userInformation = jwt.verify(token, jwtPrivateKey);
        const currentDate = new Date();
        const postId = uuidv4(); 

        const insertValues = [
            postId, title, postDescription, category, userInformation.id, imageDetail.file.path, currentDate, "posted"
        ];

        await db.query(INSERT_NEW_BLOG_POST, insertValues);

        return res.status(200).json("Blog Post has been added successfully");
    }
    catch (error){
        console.error(error);
        return res.status(500).json("Internal server error");
    }
}
//Adding blog post code ends


//Deleting particular post code starts
const deleteParticularBlogPost = async function(req, res, next){
    try {
        const token = req.body.token || req.cookies.jwt_access_token;
        if(!token){
            return res.status(401).json("Not Authenticated");
        }

        const userInformation = jwt.verify(token, jwtPrivateKey);
        const postID = req.params.postID;
        const userID = userInformation.id;

        const checkPostResult = await db.query(CHECK_USER_POST_OWNERSHIP,[postID, userID]);

        const postRows = checkPostResult[0];
        if (postRows.length === 0) {
            return res.status(404).json("Post not found or you are not authorized to delete it");
        }

        await db.query(DELETE_ALL_BLOG_COMMENT_BY_POST_ID,[postID]);
        await db.query(DELETE_BLOG_LIKE_BY_POST_ID,[postID]);
        await db.query(DELETE_BLOG_POST_BY_ID,[postID]);

        return res.status(200).json("Post has been deleted successfully");
    }
    catch (error){
        console.error(error);
        return res.status(500).json("Internal server error");
    }
}
//Deleting particular post code ends


//Updating the particular post code starts
const updateParticularBlogPost = async function(req, res, next){
    try {
        const token = req.body.token || req.cookies.jwt_access_token;
        const title = req.body.title;
        const postDescription = req.body.postDescription;
        const category = req.body.category;
        const imageDetail = req.body.imageDetail;
        const postID = req.params.postID;

        if(!token){
            return res.status(401).json("Not Authenticated");
        }

        // Verify JWT
        const userInformation = jwt.verify(token, jwtPrivateKey);
        const userID = userInformation.id;

        // Check if the post exists and belongs to the user
        const checkPostResult = await db.query(CHECK_USER_POST_OWNERSHIP,[postID, userID]);

        if (checkPostResult[0].length === 0) {
            return res.status(404).json("Post not found or you are not authorized to update it");
        }

        // Prepare query based on whether image is updated
        let updateQuery;
        let queryValues;

        if (!imageDetail) {
            updateQuery = UPDATE_BLOG_POST_NO_IMAGE;
            queryValues = [title, postDescription, category, postID, userID];
        } else {
            updateQuery = UPDATE_BLOG_POST_WITH_IMAGE;
            queryValues = [title, postDescription, category, imageDetail.file.path, postID, userID];
        }

        await db.query(updateQuery, queryValues);

        return res.status(200).json("Post has been successfully updated");
    }
    catch(error){
        console.error(error);
        return res.status(500).json("Internal server error");
    }
}
//Updating the particular post code ends


const getAllBlogPostWithUserAndCategoryInfo = async function(req, res, next){
    try {
        
        // Execute the SQL query
        const blogResult = await db.query(GET_BLOG_POSTS_JSON_ARRAY);
        const blogRows = blogResult[0];

        // Parse JSON response
        const posts = blogRows[0].posts ? JSON.parse(blogRows[0].posts) : [];

        // Return the result in JSON format
        return res.status(200).json(posts);

    } catch (error) {
        console.error(error);
        return res.status(500).json("Internal server error");
    }
}


const getFourBlogPostWithUserAndCategoryInfo = async function(req, res, next){
    try {
        const results = await db.query(GET_BLOG_POSTS_SUMMARY_JSON_ARRAY);

        // Parse the JSON string from the result into a JS object
        const posts = results[0]?.posts ? JSON.parse(results[0].posts) : [];
        return res.status(200).json(posts);

    } catch (error) {
        console.error(error);
        return res.status(500).json("Internal server error");
    }
}


const getFourBlogPostWithUserAndCategoryInfoForParticularCategory = async function(req, res, next){
    try {
        const categoryID = req.params.categoryID;

        const results = await db.query(GET_BLOG_POSTS_BY_CATEGORY_JSON_ARRAY, [categoryID]); 

        // Parse JSON_ARRAYAGG result
        const posts = results[0]?.posts ? JSON.parse(results[0].posts) : [];
        return res.status(200).json(posts);
    } 
    catch (error) {
        console.error(error);
        return res.status(500).json("Internal server error");
    }
}


const getParticularBlogPostWithUserAndCategoryInfo = async function(req, res, next){
    try {
        const postID = req.params.postID;

        const results = await db.query(GET_BLOG_POST_BY_ID_JSON_ARRAY, [postID]); 
        const post = results[0]?.posts ? JSON.parse(results[0].posts) : [];
        return res.status(200).json(post);
    } 
    catch (error) {
        console.error(error);
        return res.status(500).json("Internal server error");
    }
}


const getBlogPostWithUserAndCategoryInfoWithPagination = async function(req, res, next) {
    // Get the page and limit from the query parameters
    const page = parseInt(req.query.page); 
    const limit = parseInt(req.query.limit);  

    // Calculate the number of documents to skip based on the page and limit
    const offset = (page - 1) * limit;

    try {
        const results = await db.query(GET_BLOG_POSTS_WITH_PAGINATION_JSON_ARRAY, [limit, offset]);
        const totalCount = results[0]?.totalCount || 0;
        const totalPages = Math.ceil(totalCount / limit);
        const blogPostData = results[0]?.blogPostData ? JSON.parse(results[0].blogPostData) : [];

        return res.status(200).json({
            currentPage: page,
            totalPages,
            totalCount,
            blogPostData
        });
    } 
    catch (error) {
        console.error(error);
        return res.status(500).json("Internal server error");
    }
};


const getBlogPostWithUserAndCategoryInfoForParticularCategoryWithPagination = async function(req, res, next) {
    const categoryName = req.params.categoryName;

    // Get the page and limit from the query parameters
    const page = parseInt(req.query.page); 
    const limit = parseInt(req.query.limit);  

    // Calculate the number of documents to skip based on the page and limit
    const offset = (page - 1) * limit;

    try {
        const results = await db.query(GET_BLOG_POSTS_BY_CATEGORY_PAGINATED_JSON, [categoryName, limit, offset]);
        const totalCount = results[0]?.totalCount || 0;
        const totalPages = Math.ceil(totalCount / limit);
        const blogPostData = results[0]?.blogPostData ? JSON.parse(results[0].blogPostData) : [];

        return res.status(200).json({
            currentPage: page,
            totalPages,
            totalCount,
            blogPostData
        });

    } 
    catch (error) {
        console.error(error);
        return res.status(500).json("Internal server error");
    }
}


const getBlogPostWithUserAndCategoryForParticularUserInfoWithPagination = async function(req, res, next) {
    const username = req.params.username;

    // Get the page and limit from the query parameters
    const page = parseInt(req.query.page); 
    const limit = parseInt(req.query.limit);  

    // Calculate the number of documents to skip based on the page and limit
    const offset = (page - 1) * limit;

    try {
        const results = await db.query(GET_BLOG_POSTS_BY_USER_PAGINATED_JSON, [username, limit, offset]);
        const totalCount = results[0]?.totalCount || 0;
        const totalPages = Math.ceil(totalCount / limit);
        const blogPostData = results[0]?.blogPostData ? JSON.parse(results[0].blogPostData) : [];

        return res.status(200).json({
            currentPage: page,
            totalPages,
            totalCount,
            blogPostData
        });
    } 
    catch (error) {
        console.error(error);
        return res.status(500).json("Internal server error");
    }
};


const getBlogPostedUniqueUsersDetails = async function(req, res, next){
    try {
        const distinctResult = await db.query(GET_DISTINCT_USER_IDS_FROM_BLOG_POST);
        const distinctRows = distinctResult[0];
        if (distinctRows.length === 0) {
            return res.status(200).json([]);
        }

        const userIDs = distinctRows.map(function (row) {
            return row.USER_ID;
        });
        const usersResult = await db.query(GET_USERS_DETAILS_BY_USER_IDS,[userIDs]);
        const usersRows = usersResult[0];
        return res.status(200).json(usersRows);
    } 
    catch (error) {
        console.error(error);
        return res.status(500).json("Internal server error");
    }
}


const getBlogPostedUniqueUsersDetailsForParticularCategory =async function(req, res, next){
    const categoryName = req.params.categoryName;

    try {
        const categoryResult = await db.query(GET_CATEGORY_ID_BY_CATEGORY_NAME,[categoryName]);
        const categoryRows = categoryResult[0];
        if (categoryRows.length === 0) {
            return res.status(404).json("Category not found");
        }
        const categoryID = categoryRows[0].CATEGORY_ID;

        const distinctResult = await db.query(GET_DISTINCT_USER_IDS_BY_CATEGORY_ID_FROM_BLOG_POST,[categoryID]);
        const distinctRows = distinctResult[0];
        if (distinctRows.length === 0) {
            return res.status(200).json([]); 
        }
        const userIDs = distinctRows.map(function (row) {
            return row.USER_ID;
        });

        const usersResult = await db.query(GET_USERS_DETAILS_BY_USER_IDS,[userIDs]);
        const usersRows = usersResult[0];
        return res.status(200).json(usersRows);
    } 
    catch (error) {
        console.error(error);
        return res.status(500).json("Internal server error");
    }
}


const getBlogPostedUniqueCategoriesDetails = async function(req, res, next){
    try {
        const distinctResult = await db.query(GET_DISTINCT_CATEGORY_IDS_FROM_BLOG_POST);
        const distinctRows = distinctResult[0];
        if (distinctRows.length === 0) {
            return res.status(200).json([]); 
        }  
        const categoryIDs = distinctRows.map(function (row) {
            return row.CATEGORY_ID;
        });

        const categoriesResult = await db.query(GET_CATEGORIES_DETAILS_BY_CATEGORY_IDS,[categoryIDs]);
        const categoriesRows = categoriesResult[0];
        return res.status(200).json(categoriesRows);
    } 
    catch (error) {
        console.error(error);
        return res.status(500).json("Internal server error");
    }
}


const getBlogPostedUniqueCategoriesDetailsForParticularUser = async function(req, res, next){
    const username = req.params.username;

    try {
        const userResult = await db.query(GET_USER_ID_BY_USERNAME, [username]);
        const userRows = userResult[0];
        if (userRows.length === 0) {
            return res.status(404).json("User not found");
        }
        const userID = userRows[0].USER_ID;

        const distinctResult = await db.query(GET_DISTINCT_CATEGORY_IDS_BY_USER_ID_FROM_BLOG_POST, [userID]);
        const distinctRows = distinctResult[0];
        if (distinctRows.length === 0) {
            return res.status(200).json([]); 
        }
        const categoryIDs = distinctRows.map(function (row) {
            return row.CATEGORY_ID;
        });

        const categoriesResult = await db.query(GET_CATEGORIES_DETAILS_BY_CATEGORY_IDS,[categoryIDs]);
        const categoriesRows = categoriesResult[0];
        return res.status(200).json(categoriesRows);
    } 
    catch (error) {
        console.error(error);
        return res.status(500).json("Internal server error");
    }
}


const getBlogPostDetailsWithFilterSortWithPagination = async function(req, res, next) {
    const sortSelection = req.body.sortSelection;
    const allCheckedCategory = req.body.allCheckedCategory;
    const allCheckedAuthor = req.body.allCheckedAuthor;
    const checkedDate = req.body.checkedDate;

    // Get the page and limit from the query parameters
    const page = parseInt(req.query.page); 
    const limit = parseInt(req.query.limit);  

    // Calculate the number of documents to skip based on the page and limit
    const offset = (page - 1) * limit;

    let query = "";
    let params = [];


    // ----- Sorting -----
    let orderBy = 'post.POST_DATE_TIME DESC'; // default
    if (sortSelection && sortSelection !== '') {
        if (sortSelection === "postTitleAscending") {
            orderBy = 'post.POST_TITLE ASC';
        } 
        else if (sortSelection === "postTitleDescending") {
            orderBy = 'post.POST_TITLE DESC';
        } 
        else if (sortSelection === "authorAscending") {
            orderBy = 'users.FULL_NAME ASC';
        } 
        else if (sortSelection === "authorDescending") {
            orderBy = 'users.FULL_NAME DESC';
        } 
        else if (sortSelection === "categoryAscending") {
            orderBy = 'category.CATEGORY_NAME ASC';
        } 
        else if (sortSelection === "categoryDescending") {
            orderBy = 'category.CATEGORY_NAME DESC';
        } 
        else if (sortSelection === "postDateAscending") {
            orderBy = 'post.POST_DATE_TIME ASC';
        } 
        else if (sortSelection === "postDateDescending") {
            orderBy = 'post.POST_DATE_TIME DESC';
        }
        if (sortSelection === "postLengthAscending") {
            orderBy = 'LENGTH(post.POST_DESCRIPTION) ASC';
        } else if (sortSelection === "postLengthDescending") {
            orderBy = 'LENGTH(post.POST_DESCRIPTION) DESC';
        }
    }


    // Compute date filter
    let dateFrom = null;
    if (checkedDate && checkedDate !== "everyTime") {
        const now = new Date();
        const timeMap = {
            "1hour": 1 * 60 * 60 * 1000,
            "24hours": 24 * 60 * 60 * 1000,
            "7days": 7 * 24 * 60 * 60 * 1000,
            "1month": 30 * 24 * 60 * 60 * 1000,
            "3months": 90 * 24 * 60 * 60 * 1000,
            "6months": 180 * 24 * 60 * 60 * 1000,
            "1year": 365 * 24 * 60 * 60 * 1000
        };
        dateFrom = new Date(now.getTime() - timeMap[checkedDate]);
    }

     // --- Decide which query to use ---

    const hasCategory = Array.isArray(allCheckedCategory) && allCheckedCategory.length > 0;
    const hasAuthor = Array.isArray(allCheckedAuthor) && allCheckedAuthor.length > 0;
    const hasDate = dateFrom !== null;


    if(hasCategory && hasAuthor && hasDate){
        query = GET_BLOG_POSTS_BY_CATEGORY_AUTHOR_DATE.replace('ORDER BY ?', `ORDER BY ${orderBy}`);
        params = [allCheckedCategory, allCheckedAuthor, dateFrom, limit, offset];
    }
    else if(hasCategory && hasAuthor){
        query = GET_BLOG_POSTS_BY_CATEGORY_AUTHOR.replace('ORDER BY ?', `ORDER BY ${orderBy}`);
        params = [allCheckedCategory, allCheckedAuthor, limit, offset];
    }
    else if (hasAuthor && hasDate) {
        query = GET_BLOG_POSTS_BY_AUTHOR_DATE.replace('ORDER BY ?', `ORDER BY ${orderBy}`);
        params = [allCheckedAuthor, dateFrom, limit, offset];
    }
    else if (hasCategory && hasDate) {
        query = GET_BLOG_POSTS_BY_CATEGORY_DATE.replace('ORDER BY ?', `ORDER BY ${orderBy}`);
        params = [allCheckedCategory, dateFrom, limit, offset];
    }
    else if (hasCategory) {
        query = GET_BLOG_POSTS_BY_CATEGORY_ONLY.replace('ORDER BY ?', `ORDER BY ${orderBy}`);
        params = [allCheckedCategory, limit, offset];
    }
    else if (hasAuthor) {
        query = GET_BLOG_POSTS_BY_AUTHOR_ONLY.replace('ORDER BY ?', `ORDER BY ${orderBy}`);
        params = [allCheckedAuthor, limit, offset];
    }
    else if (hasDate) {
        query = GET_BLOG_POSTS_BY_DATE_ONLY.replace('ORDER BY ?', `ORDER BY ${orderBy}`);
        params = [dateFrom, limit, offset];
    }
    else {
        query = GET_BLOG_POSTS_NO_FILTERS.replace('ORDER BY ?', `ORDER BY ${orderBy}`);
        params = [limit, offset];
    }

    try {
        const result = await db.execute(query, params);
        const rows = result[0];     
        
        const totalCount = rows[0]?.totalCount || 0;
        const totalPages = Math.ceil(totalCount / limit);

        return res.status(200).json({
            currentPage: page,
            totalPages,
            totalCount,
            blogPostData: rows[0]?.blogPostData || []
        });
    } 
    catch (error) {
        console.error(error);
        return res.status(500).json("Internal server error");
    }
}


const getBlogPostDetailsWithFilterSortWithPaginationForParticularUser = async function(req, res, next){
    const username = req.params.username;

    const sortSelection = req.body.sortSelection;
    const allCheckedCategory = req.body.allCheckedCategory;
    const checkedDate = req.body.checkedDate;

    // Get the page and limit from the query parameters
    const page = parseInt(req.query.page); 
    const limit = parseInt(req.query.limit);  

    // Calculate the number of documents to skip based on the page and limit
    const offset = (page - 1) * limit;

    let query = "";
    let params = [];


    // ----- Sorting -----
    let orderBy = 'post.POST_DATE_TIME DESC'; 
    if (sortSelection && sortSelection !== '') {
        if (sortSelection === "postTitleAscending") {
            orderBy = 'post.POST_TITLE ASC';
        } 
        else if (sortSelection === "postTitleDescending") {
            orderBy = 'post.POST_TITLE DESC';
        } 
        else if (sortSelection === "authorAscending") {
            orderBy = 'users.FULL_NAME ASC';
        } 
        else if (sortSelection === "authorDescending") {
            orderBy = 'users.FULL_NAME DESC';
        } 
        else if (sortSelection === "categoryAscending") {
            orderBy = 'category.CATEGORY_NAME ASC';
        } 
        else if (sortSelection === "categoryDescending") {
            orderBy = 'category.CATEGORY_NAME DESC';
        } 
        else if (sortSelection === "postDateAscending") {
            orderBy = 'post.POST_DATE_TIME ASC';
        } 
        else if (sortSelection === "postDateDescending") {
            orderBy = 'post.POST_DATE_TIME DESC';
        }
        if (sortSelection === "postLengthAscending") {
            orderBy = 'LENGTH(post.POST_DESCRIPTION) ASC';
        } else if (sortSelection === "postLengthDescending") {
            orderBy = 'LENGTH(post.POST_DESCRIPTION) DESC';
        }
    }

    // Compute date filter
    let dateFrom = null;
    if (checkedDate && checkedDate !== "everyTime") {
        const now = new Date();
        const timeMap = {
            "1hour": 1 * 60 * 60 * 1000,
            "24hours": 24 * 60 * 60 * 1000,
            "7days": 7 * 24 * 60 * 60 * 1000,
            "1month": 30 * 24 * 60 * 60 * 1000,
            "3months": 90 * 24 * 60 * 60 * 1000,
            "6months": 180 * 24 * 60 * 60 * 1000,
            "1year": 365 * 24 * 60 * 60 * 1000
        };
        dateFrom = new Date(now.getTime() - timeMap[checkedDate]);
    }


    const hasCategory = Array.isArray(allCheckedCategory) && allCheckedCategory.length > 0;
    const hasDate = dateFrom !== null;

    try {
        // Get the user ID from username
        const userResult = await db.execute(GET_USER_ID_BY_USERNAME, [username]);

        const userRows = userResult[0];
        if (!userRows || userRows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        const userID = userRows[0].USER_ID;

        if (hasCategory && hasDate) {
            query = GET_BLOG_POSTS_BY_CATEGORY_AUTHOR_DATE.replace('ORDER BY ?', `ORDER BY ${orderBy}`);
            params = [allCheckedCategory, userID, dateFrom, limit, offset];
        }
        else if(hasCategory){
            query = GET_BLOG_POSTS_BY_CATEGORY_AUTHOR.replace('ORDER BY ?', `ORDER BY ${orderBy}`);
            params = [allCheckedCategory, userID, limit, offset];
        }
        else if(hasDate){
            query = GET_BLOG_POSTS_BY_AUTHOR_DATE.replace('ORDER BY ?', `ORDER BY ${orderBy}`);
            params = [userID, dateFrom, limit, offset];
        }
        else {
            query = GET_BLOG_POSTS_BY_AUTHOR_ONLY.replace('ORDER BY ?', `ORDER BY ${orderBy}`);
            params = [userID, limit, offset];
        }

        // Execute query
        const result = await db.execute(query, params);
        const rows = result[0];

        const blogPostData = rows[0]?.blogPostData || [];
        const totalCount = rows[0]?.totalCount || 0;
        const totalPages = Math.ceil(totalCount / limit);

        return res.status(200).json({
            currentPage: page,
            totalPages,
            totalCount,
            blogPostData
        });

    } 
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    
    }
}


const getBlogPostDetailsWithFilterSortWithPaginationForParticularCategory = async function(req, res, next){
    const categoryName = req.params.categoryName;

    const sortSelection = req.body.sortSelection;
    const allCheckedAuthor = req.body.allCheckedAuthor;
    const checkedDate = req.body.checkedDate;

    // Get the page and limit from the query parameters
    const page = parseInt(req.query.page); 
    const limit = parseInt(req.query.limit);  

    // Calculate the number of documents to skip based on the page and limit
    const offset = (page - 1) * limit;

    
    let query = "";
    let params = [];


    // ----- Sorting -----
    let orderBy = 'post.POST_DATE_TIME DESC'; 
    if (sortSelection && sortSelection !== '') {
        if (sortSelection === "postTitleAscending") {
            orderBy = 'post.POST_TITLE ASC';
        } 
        else if (sortSelection === "postTitleDescending") {
            orderBy = 'post.POST_TITLE DESC';
        } 
        else if (sortSelection === "authorAscending") {
            orderBy = 'users.FULL_NAME ASC';
        } 
        else if (sortSelection === "authorDescending") {
            orderBy = 'users.FULL_NAME DESC';
        } 
        else if (sortSelection === "categoryAscending") {
            orderBy = 'category.CATEGORY_NAME ASC';
        } 
        else if (sortSelection === "categoryDescending") {
            orderBy = 'category.CATEGORY_NAME DESC';
        } 
        else if (sortSelection === "postDateAscending") {
            orderBy = 'post.POST_DATE_TIME ASC';
        } 
        else if (sortSelection === "postDateDescending") {
            orderBy = 'post.POST_DATE_TIME DESC';
        }
        if (sortSelection === "postLengthAscending") {
            orderBy = 'LENGTH(post.POST_DESCRIPTION) ASC';
        } else if (sortSelection === "postLengthDescending") {
            orderBy = 'LENGTH(post.POST_DESCRIPTION) DESC';
        }
    }

    // Compute date filter
    let dateFrom = null;
    if (checkedDate && checkedDate !== "everyTime") {
        const now = new Date();
        const timeMap = {
            "1hour": 1 * 60 * 60 * 1000,
            "24hours": 24 * 60 * 60 * 1000,
            "7days": 7 * 24 * 60 * 60 * 1000,
            "1month": 30 * 24 * 60 * 60 * 1000,
            "3months": 90 * 24 * 60 * 60 * 1000,
            "6months": 180 * 24 * 60 * 60 * 1000,
            "1year": 365 * 24 * 60 * 60 * 1000
        };
        dateFrom = new Date(now.getTime() - timeMap[checkedDate]);
    }


    const hasAuthor = Array.isArray(allCheckedAuthor) && allCheckedAuthor.length > 0;
    const hasDate = dateFrom !== null;


    try {
        // Get the category ID
        const categoryResult = await db.execute(GET_CATEGORY_ID_BY_CATEGORY_NAME, [categoryName]);
        const categoryRows = categoryResult[0];
        if (!categoryRows || categoryRows.length === 0) {
            return res.status(404).json({ message: "Category not found" });
        }

        const categoryID = categoryRows[0].CATEGORY_ID;

        if (hasAuthor && hasDate) {
            query = GET_BLOG_POSTS_BY_CATEGORY_AUTHOR_DATE.replace('ORDER BY ?', `ORDER BY ${orderBy}`);;
            params = [categoryID, allCheckedAuthor, dateFrom, limit, offset];
        } else if (hasAuthor) {
            query = GET_BLOG_POSTS_BY_CATEGORY_AUTHOR.replace('ORDER BY ?', `ORDER BY ${orderBy}`);;
            params = [categoryID, allCheckedAuthor, limit, offset];
        } else if (hasDate) {
            query = GET_BLOG_POSTS_BY_CATEGORY_DATE.replace('ORDER BY ?', `ORDER BY ${orderBy}`);;
            params = [categoryID, dateFrom, limit, offset];
        } else {
            query = GET_BLOG_POSTS_BY_CATEGORY_ONLY.replace('ORDER BY ?', `ORDER BY ${orderBy}`);;
            params = [categoryID, limit, offset];
        }

        const result = await db.execute(query, params);
        const rows = result[0];
        const totalCount = rows[0]?.totalCount || 0;
        const totalPages = Math.ceil(totalCount / limit);

        return res.status(200).json({
            currentPage: page,
            totalPages,
            totalCount,
            blogPostData: rows[0]?.blogPostData || []
        });

    } 
    catch (error) {
        console.error(error);
        return res.status(500).json("Internal server error");
    }
}


module.exports = {
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
};