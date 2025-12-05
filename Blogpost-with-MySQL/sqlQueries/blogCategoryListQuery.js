const GET_ALL_CATEGORIES = `
    SELECT 
        CATEGORY_ID AS _id, 
        CATEGORY_NAME AS categoryName, 
        CATEGORY_DESCRIPTION AS categoryDescription
    FROM BLOG_CATEGORY
`;


const GET_CATEGORY_ID_BY_CATEGORY_NAME = `
    SELECT 
    CATEGORY_ID 
    FROM BLOG_CATEGORY 
    WHERE CATEGORY_NAME = ?
`;


const GET_CATEGORIES_DETAILS_BY_CATEGORY_IDS = `
    SELECT 
    CATEGORY_ID AS _id, 
    CATEGORY_NAME AS categoryName
    FROM BLOG_CATEGORY
    WHERE CATEGORY_ID IN (?)
`;


const GET_BLOG_CATEGORIES_JSON_ARRAY_FOR_SEARCH = `
    SELECT JSON_ARRAYAGG(
        JSON_OBJECT(
            'type', 'Blog Category',
            '_id', category.CATEGORY_ID,
            'categoryName', category.CATEGORY_NAME
        )
    ) AS results
    FROM BLOG_CATEGORY AS category
    WHERE category.CATEGORY_NAME LIKE ?
    LIMIT 5;
`;


module.exports = {
    GET_ALL_CATEGORIES,
    GET_CATEGORY_ID_BY_CATEGORY_NAME,
    GET_CATEGORIES_DETAILS_BY_CATEGORY_IDS,
    GET_BLOG_CATEGORIES_JSON_ARRAY_FOR_SEARCH
}