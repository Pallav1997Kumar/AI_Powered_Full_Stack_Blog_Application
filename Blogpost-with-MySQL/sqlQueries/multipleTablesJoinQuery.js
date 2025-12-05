const GET_BLOG_POST_COMMENTS_JSON_ARRAY = `
    SELECT JSON_ARRAYAGG(
        JSON_OBJECT(
            '_id', comment.COMMENT_ID,
            'commentDescription', comment.COMMENT_DESCRIPTION,
            'commentDateTime', comment.COMMENT_DATE_TIME,
            'userID', comment.USER_ID,
            'postID', comment.POST_ID,
            'userDetails', JSON_OBJECT(
                'fullName', users.FULL_NAME,
                'username', users.USERNAME,
                'userProfilePhoto', users.USER_PROFILE_PHOTO
            )
        )
    ) AS comments
    FROM BLOG_POST_COMMENT AS comment
    INNER JOIN BLOG_USERS AS users
        ON comment.USER_ID = users.USER_ID
    WHERE comment.POST_ID = ?;
`;


const GET_BLOG_POST_LIKES_JSON_ARRAY = `
    SELECT JSON_ARRAYAGG(
        JSON_OBJECT(
            '_id', blogPostLike.LIKE_ID,
            'userID', blogPostLike.USER_ID,
            'postID', blogPostLike.POST_ID,
            'userDetails', JSON_OBJECT(
                'fullName', users.FULL_NAME,
                'username', users.USERNAME,
                'userProfilePhoto', users.USER_PROFILE_PHOTO
            )
        )
    ) AS likes
    FROM BLOG_POST_LIKE AS blogPostLike
    INNER JOIN BLOG_USERS AS users
        ON blogPostLike.USER_ID = users.USER_ID
    WHERE blogPostLike.POST_ID = ?;
`;


const GET_BLOG_POSTS_JSON_ARRAY = `
    SELECT JSON_ARRAYAGG(
        JSON_OBJECT(
            '_id', post.POST_ID,
            'postTitle', post.POST_TITLE,
            'postDescription', post.POST_DESCRIPTION,
            'postImage', post.POST_IMAGE_FILENAME,
            'postDateTime', post.POST_DATE_TIME,
            'postStatus', post.POST_STATUS,
            'userID', post.USER_ID,
            'categoryID', post.CATEGORY_ID,
            'userDetails', JSON_OBJECT(
                '_id', users.USER_ID,            
                'firstName', users.FIRST_NAME,
                'middleName', users.MIDDLE_NAME,
                'lastName', users.LAST_NAME,
                'fullName', users.FULL_NAME,
                'username', users.USERNAME,
                'emailAddress', users.EMAIL_ADDRESS,
                'gender', users.GENDER,
                'dateOfBirth', users.DATE_OF_BIRTH,
                'userProfilePhoto', users.USER_PROFILE_PHOTO
            ),
            'categoryDetails', JSON_OBJECT(
                '_id', category.CATEGORY_ID,      
                'categoryName', category.CATEGORY_NAME,
                'categoryDescription', category.CATEGORY_DESCRIPTION
            )
        )
    ) AS posts
    FROM BLOG_POST AS post
    INNER JOIN BLOG_USERS AS users
        ON post.USER_ID = users.USER_ID
    INNER JOIN BLOG_CATEGORY AS category
        ON post.CATEGORY_ID = category.CATEGORY_ID;
`;


const GET_BLOG_POSTS_SUMMARY_JSON_ARRAY = `
    SELECT JSON_ARRAYAGG(
        JSON_OBJECT(
            '_id', post.POST_ID,
            'postTitle', post.POST_TITLE,
            'postDescription', post.POST_DESCRIPTION,
            'postImage', post.POST_IMAGE_FILENAME,
            'userDetails', JSON_OBJECT(
                'fullName', users.FULL_NAME
            ),
            'categoryDetails', JSON_OBJECT(
                'categoryName', category.CATEGORY_NAME
            )
        )
    ) AS posts
    FROM BLOG_POST AS post
    INNER JOIN BLOG_USERS AS users
        ON post.USER_ID = users.USER_ID
    INNER JOIN BLOG_CATEGORY AS category
        ON post.CATEGORY_ID = category.CATEGORY_ID
    LIMIT 4;
`;


const GET_BLOG_POSTS_BY_CATEGORY_JSON_ARRAY = `
    SELECT JSON_ARRAYAGG(
        JSON_OBJECT(
            '_id', post.POST_ID,
            'postTitle', post.POST_TITLE,
            'postDescription', post.POST_DESCRIPTION,
            'postImage', post.POST_IMAGE_FILENAME,
            'userDetails', JSON_OBJECT(
                'fullName', users.FULL_NAME
            ),
            'categoryDetails', JSON_OBJECT(
                'categoryName', category.CATEGORY_NAME
            )
        )
    ) AS posts
    FROM BLOG_POST AS post
    INNER JOIN BLOG_USERS AS users
        ON post.USER_ID = users.USER_ID
    INNER JOIN BLOG_CATEGORY AS category
        ON post.CATEGORY_ID = category.CATEGORY_ID
    WHERE post.CATEGORY_ID = ?
    LIMIT 4;
`;


const GET_BLOG_POST_BY_ID_JSON_ARRAY = `
    SELECT JSON_ARRAYAGG(
        JSON_OBJECT(
            '_id', post.POST_ID,
            'postTitle', post.POST_TITLE,
            'postDescription', post.POST_DESCRIPTION,
            'postImage', post.POST_IMAGE_FILENAME,
            'postDateTime', post.POST_DATE_TIME,
            'userDetails', JSON_OBJECT(
                '_id', users.USER_ID,
                'fullName', users.FULL_NAME,
                'username', users.USERNAME,
                'userProfilePhoto', users.USER_PROFILE_PHOTO
            ),
            'categoryDetails', JSON_OBJECT(
                '_id', category.CATEGORY_ID,
                'categoryName', category.CATEGORY_NAME
            )
        )
    ) AS posts
    FROM BLOG_POST AS post
    INNER JOIN BLOG_USERS AS users
        ON post.USER_ID = users.USER_ID
    INNER JOIN BLOG_CATEGORY AS category
        ON post.CATEGORY_ID = category.CATEGORY_ID
    WHERE post.POST_ID = ?;
`;


const GET_BLOG_POSTS_WITH_PAGINATION_JSON_ARRAY = `
    SELECT JSON_ARRAYAGG(
        JSON_OBJECT(
            '_id', post.POST_ID,
            'postTitle', post.POST_TITLE,
            'postDescription', post.POST_DESCRIPTION,
            'postImage', post.POST_IMAGE_FILENAME,
            'postDateTime', post.POST_DATE_TIME,
            'userDetails', JSON_OBJECT(
                '_id', users.USER_ID,
                'fullName', users.FULL_NAME,
                'username', users.USERNAME,
                'userProfilePhoto', users.USER_PROFILE_PHOTO
            ),
            'categoryDetails', JSON_OBJECT(
                '_id', category.CATEGORY_ID,
                'categoryName', category.CATEGORY_NAME
            )
        )
    ) AS blogPostData,
    COUNT(*) OVER() AS totalCount
    FROM BLOG_POST AS post
    INNER JOIN BLOG_USERS AS users ON post.USER_ID = users.USER_ID
    INNER JOIN BLOG_CATEGORY AS category ON post.CATEGORY_ID = category.CATEGORY_ID
    LIMIT ? OFFSET ?;
`;


const GET_BLOG_POSTS_BY_CATEGORY_PAGINATED_JSON = `
    SELECT JSON_ARRAYAGG(
        JSON_OBJECT(
            '_id', post.POST_ID,
            'postTitle', post.POST_TITLE,
            'postDescription', post.POST_DESCRIPTION,
            'postImage', post.POST_IMAGE_FILENAME,
            'postDateTime', post.POST_DATE_TIME,
            'userDetails', JSON_OBJECT(
                '_id', users.USER_ID,
                'fullName', users.FULL_NAME,
                'username', users.USERNAME,
                'userProfilePhoto', users.USER_PROFILE_PHOTO
            ),
            'categoryDetails', JSON_OBJECT(
                '_id', category.CATEGORY_ID,
                'categoryName', category.CATEGORY_NAME
            )
        )
    ) AS blogPostData,
    COUNT(*) OVER() AS totalCount
    FROM BLOG_POST AS post
    INNER JOIN BLOG_USERS AS users ON post.USER_ID = users.USER_ID
    INNER JOIN BLOG_CATEGORY AS category ON post.CATEGORY_ID = category.CATEGORY_ID
    WHERE category.CATEGORY_NAME = ?
    LIMIT ? OFFSET ?;
`;


const GET_BLOG_POSTS_BY_USER_PAGINATED_JSON = `
    SELECT JSON_ARRAYAGG(
        JSON_OBJECT(
            '_id', post.POST_ID,
            'postTitle', post.POST_TITLE,
            'postDescription', post.POST_DESCRIPTION,
            'postImage', post.POST_IMAGE_FILENAME,
            'postDateTime', post.POST_DATE_TIME,
            'userDetails', JSON_OBJECT(
                '_id', users.USER_ID,
                'fullName', users.FULL_NAME,
                'username', users.USERNAME,
                'userProfilePhoto', users.USER_PROFILE_PHOTO
            ),
            'categoryDetails', JSON_OBJECT(
                '_id', category.CATEGORY_ID,
                'categoryName', category.CATEGORY_NAME
            )
        )
    ) AS blogPostData,
    COUNT(*) OVER() AS totalCount
    FROM BLOG_POST AS post
    INNER JOIN BLOG_USERS AS users ON post.USER_ID = users.USER_ID
    INNER JOIN BLOG_CATEGORY AS category ON post.CATEGORY_ID = category.CATEGORY_ID
    WHERE users.USERNAME = ?
    LIMIT ? OFFSET ?;
`;


const GET_BLOG_POSTS_BY_CATEGORY_AUTHOR_DATE = `
    SELECT JSON_ARRAYAGG(
        JSON_OBJECT(
            '_id', post.POST_ID,
            'postTitle', post.POST_TITLE,
            'postDescription', post.POST_DESCRIPTION,
            'postImage', post.POST_IMAGE_FILENAME,
            'postDateTime', post.POST_DATE_TIME,
            'userDetails', JSON_OBJECT(
                '_id', users.USER_ID,
                'fullName', users.FULL_NAME,
                'username', users.USERNAME,
                'userProfilePhoto', users.USER_PROFILE_PHOTO
            ),
            'categoryDetails', JSON_OBJECT(
                '_id', category.CATEGORY_ID,
                'categoryName', category.CATEGORY_NAME
            )
        )
    ) AS blogPostData,
    COUNT(*) OVER() AS totalCount
    FROM BLOG_POST post
    JOIN BLOG_USERS users ON post.USER_ID = users.USER_ID
    JOIN BLOG_CATEGORY category ON post.CATEGORY_ID = category.CATEGORY_ID
    WHERE post.CATEGORY_ID IN (?) 
    AND post.USER_ID IN (?)
    AND post.POST_DATE_TIME >= ?
    ORDER BY ?
    LIMIT ? OFFSET ?;
`;


const GET_BLOG_POSTS_BY_CATEGORY_AUTHOR = `
    SELECT JSON_ARRAYAGG(
        JSON_OBJECT(
            '_id', post.POST_ID,
            'postTitle', post.POST_TITLE,
            'postDescription', post.POST_DESCRIPTION,
            'postImage', post.POST_IMAGE_FILENAME,
            'postDateTime', post.POST_DATE_TIME,
            'userDetails', JSON_OBJECT(
                '_id', users.USER_ID,
                'fullName', users.FULL_NAME,
                'username', users.USERNAME,
                'userProfilePhoto', users.USER_PROFILE_PHOTO
            ),
            'categoryDetails', JSON_OBJECT(
                '_id', category.CATEGORY_ID,
                'categoryName', category.CATEGORY_NAME
            )
        )
    ) AS blogPostData,
    COUNT(*) OVER() AS totalCount
    FROM BLOG_POST post
    JOIN BLOG_USERS users ON post.USER_ID = users.USER_ID
    JOIN BLOG_CATEGORY category ON post.CATEGORY_ID = category.CATEGORY_ID
    WHERE post.CATEGORY_ID IN (?)
    AND post.USER_ID IN (?)
    ORDER BY ?
    LIMIT ? OFFSET ?;
`;


const GET_BLOG_POSTS_BY_AUTHOR_DATE = `
    SELECT JSON_ARRAYAGG(
        JSON_OBJECT(
            '_id', post.POST_ID,
            'postTitle', post.POST_TITLE,
            'postDescription', post.POST_DESCRIPTION,
            'postImage', post.POST_IMAGE_FILENAME,
            'postDateTime', post.POST_DATE_TIME,
            'userDetails', JSON_OBJECT(
                '_id', users.USER_ID,
                'fullName', users.FULL_NAME,
                'username', users.USERNAME,
                'userProfilePhoto', users.USER_PROFILE_PHOTO
            ),
            'categoryDetails', JSON_OBJECT(
                '_id', category.CATEGORY_ID,
                'categoryName', category.CATEGORY_NAME
            )
        )
    ) AS blogPostData,
    COUNT(*) OVER() AS totalCount
    FROM BLOG_POST post
    JOIN BLOG_USERS users ON post.USER_ID = users.USER_ID
    JOIN BLOG_CATEGORY category ON post.CATEGORY_ID = category.CATEGORY_ID
    WHERE post.USER_ID IN (?)
    AND post.POST_DATE_TIME >= ?
    ORDER BY ?
    LIMIT ? OFFSET ?;
`;


const GET_BLOG_POSTS_BY_CATEGORY_DATE = `
    SELECT JSON_ARRAYAGG(
        JSON_OBJECT(
            '_id', post.POST_ID,
            'postTitle', post.POST_TITLE,
            'postDescription', post.POST_DESCRIPTION,
            'postImage', post.POST_IMAGE_FILENAME,
            'postDateTime', post.POST_DATE_TIME,
            'userDetails', JSON_OBJECT(
                '_id', users.USER_ID,
                'fullName', users.FULL_NAME,
                'username', users.USERNAME,
                'userProfilePhoto', users.USER_PROFILE_PHOTO
            ),
            'categoryDetails', JSON_OBJECT(
                '_id', category.CATEGORY_ID,
                'categoryName', category.CATEGORY_NAME
            )
        )
    ) AS blogPostData,
    COUNT(*) OVER() AS totalCount
    FROM BLOG_POST post
    JOIN BLOG_USERS users ON post.USER_ID = users.USER_ID
    JOIN BLOG_CATEGORY category ON post.CATEGORY_ID = category.CATEGORY_ID
    WHERE post.CATEGORY_ID IN (?)
    AND post.POST_DATE_TIME >= ?
    ORDER BY ?
    LIMIT ? OFFSET ?;
`;


const GET_BLOG_POSTS_BY_CATEGORY_ONLY = `
    SELECT JSON_ARRAYAGG(
        JSON_OBJECT(
            '_id', post.POST_ID,
            'postTitle', post.POST_TITLE,
            'postDescription', post.POST_DESCRIPTION,
            'postImage', post.POST_IMAGE_FILENAME,
            'postDateTime', post.POST_DATE_TIME,
            'userDetails', JSON_OBJECT(
                '_id', users.USER_ID,
                'fullName', users.FULL_NAME,
                'username', users.USERNAME,
                'userProfilePhoto', users.USER_PROFILE_PHOTO
            ),
            'categoryDetails', JSON_OBJECT(
                '_id', category.CATEGORY_ID,
                'categoryName', category.CATEGORY_NAME
            )
        )
    ) AS blogPostData,
    COUNT(*) OVER() AS totalCount
    FROM BLOG_POST post
    JOIN BLOG_USERS users ON post.USER_ID = users.USER_ID
    JOIN BLOG_CATEGORY category ON post.CATEGORY_ID = category.CATEGORY_ID
    WHERE post.CATEGORY_ID IN (?)
    ORDER BY ?
    LIMIT ? OFFSET ?;
`;


const GET_BLOG_POSTS_BY_AUTHOR_ONLY = `
    SELECT JSON_ARRAYAGG(
        JSON_OBJECT(
            '_id', post.POST_ID,
            'postTitle', post.POST_TITLE,
            'postDescription', post.POST_DESCRIPTION,
            'postImage', post.POST_IMAGE_FILENAME,
            'postDateTime', post.POST_DATE_TIME,
            'userDetails', JSON_OBJECT(
                '_id', users.USER_ID,
                'fullName', users.FULL_NAME,
                'username', users.USERNAME,
                'userProfilePhoto', users.USER_PROFILE_PHOTO
            ),
            'categoryDetails', JSON_OBJECT(
                '_id', category.CATEGORY_ID,
                'categoryName', category.CATEGORY_NAME
            )
        )
    ) AS blogPostData,
    COUNT(*) OVER() AS totalCount
    FROM BLOG_POST post
    JOIN BLOG_USERS users ON post.USER_ID = users.USER_ID
    JOIN BLOG_CATEGORY category ON post.CATEGORY_ID = category.CATEGORY_ID
    WHERE post.USER_ID IN (?)
    ORDER BY ?
    LIMIT ? OFFSET ?;
`;


const GET_BLOG_POSTS_BY_DATE_ONLY = `
    SELECT JSON_ARRAYAGG(
        JSON_OBJECT(
            '_id', post.POST_ID,
            'postTitle', post.POST_TITLE,
            'postDescription', post.POST_DESCRIPTION,
            'postImage', post.POST_IMAGE_FILENAME,
            'postDateTime', post.POST_DATE_TIME,
            'userDetails', JSON_OBJECT(
                '_id', users.USER_ID,
                'fullName', users.FULL_NAME,
                'username', users.USERNAME,
                'userProfilePhoto', users.USER_PROFILE_PHOTO
            ),
            'categoryDetails', JSON_OBJECT(
                '_id', category.CATEGORY_ID,
                'categoryName', category.CATEGORY_NAME
            )
        )
    ) AS blogPostData,
    COUNT(*) OVER() AS totalCount
    FROM BLOG_POST post
    JOIN BLOG_USERS users ON post.USER_ID = users.USER_ID
    JOIN BLOG_CATEGORY category ON post.CATEGORY_ID = category.CATEGORY_ID
    WHERE post.POST_DATE_TIME >= ?
    ORDER BY ?
    LIMIT ? OFFSET ?;
`;


const GET_BLOG_POSTS_NO_FILTERS = `
    SELECT JSON_ARRAYAGG(
        JSON_OBJECT(
            '_id', post.POST_ID,
            'postTitle', post.POST_TITLE,
            'postDescription', post.POST_DESCRIPTION,
            'postImage', post.POST_IMAGE_FILENAME,
            'postDateTime', post.POST_DATE_TIME,
            'userDetails', JSON_OBJECT(
                '_id', users.USER_ID,
                'fullName', users.FULL_NAME,
                'username', users.USERNAME,
                'userProfilePhoto', users.USER_PROFILE_PHOTO
            ),
            'categoryDetails', JSON_OBJECT(
                '_id', category.CATEGORY_ID,
                'categoryName', category.CATEGORY_NAME
            )
        )
    ) AS blogPostData,
    COUNT(*) OVER() AS totalCount
    FROM BLOG_POST post
    JOIN BLOG_USERS users ON post.USER_ID = users.USER_ID
    JOIN BLOG_CATEGORY category ON post.CATEGORY_ID = category.CATEGORY_ID
    ORDER BY ?
    LIMIT ? OFFSET ?;
`;

module.exports = {
    GET_BLOG_POST_COMMENTS_JSON_ARRAY,
    GET_BLOG_POST_LIKES_JSON_ARRAY,
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
}