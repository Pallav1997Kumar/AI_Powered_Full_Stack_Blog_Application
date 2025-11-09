const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const blogCategorySchema =  new Schema({
    categoryName: {
        type: String,
        required: true,
        unique: true
    },
    categoryDescription: {
        type: String,
        required: true
    }
});

const BlogCategory = mongoose.model('BLOGCATEGORY', blogCategorySchema);

module.exports = BlogCategory;