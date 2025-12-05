const db = require("../config/databaseConfig");

const { GET_ALL_CATEGORIES } = require("../sqlQueries/blogCategoryListQuery");


const getAllBlogCategoryList = async function(req, res, next){
    try {
        const result = await db.query(GET_ALL_CATEGORIES);
        return res.status(200).json(result[0]);
    } 
    catch (error) {
        console.error(error);
        return res.status(500).json("Internal server error");
    }
}


module.exports = {
    getAllBlogCategoryList
};