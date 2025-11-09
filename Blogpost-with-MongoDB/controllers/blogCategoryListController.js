const BlogCategory = require("../database-models/blogCategory");


const getAllBlogCategoryList = function(req, res, next){
    BlogCategory.find()
    .then((result) => {        
        return res.status(200).json(result);
    }).catch((err) => {
        console.log(err);
    });
}


module.exports = {
    getAllBlogCategoryList
};