const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const BlogPost = require("../database-models/blogPost");
const BlogPostLike = require("../database-models/blogPostLike");
const BlogPostComment = require("../database-models/blogPostComment");
const BlogUser = require("../database-models/blogUser");
const BlogCategory = require("../database-models/blogCategory");

dotenv.config({path: "./config.env"});

const jwtPrivateKey = process.env.jwtPrivateKey;


//Adding blog post code starts
const addNewBlogPost = function(req, res, next){
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
    jwt.verify(token, jwtPrivateKey, function(error, userInformation){
        const currentDate = new Date();
        const newPost = new BlogPost({
            postTitle: title,
            postDescription: postDescription,
            categoryID: category,
            userID: userInformation.id,
            postImage: imageDetail.file.path,
            postDateTime: currentDate,
            postStatus: "posted"
        });
        newPost.save()
        .then((result) => {
            return res.status(200).json("Blog Post has been added successfully");
        }).catch((err) => {
            console.log(err);
        });        
    });
}
//Adding blog post code ends


//Deleting particular post code starts
const deleteParticularBlogPost = function(req, res, next){
    const token = req.body.token || req.cookies.jwt_access_token;
    if(!token){
        return res.status(401).json("Not Authenticated");
    }
    jwt.verify(token, jwtPrivateKey, function(error, userInformation){
        const postID = req.params.postID;
        const userID = userInformation.id;
        BlogPost.findByIdAndDelete(postID)
        .then((result) => {
            BlogPostComment.deleteMany( {postID: postID} );
            BlogPostLike.deleteMany( {postID: postID} );
            return res.status(200).json("Post has been deleted successfully");
        }).catch((err) => {
            console.log(err);
        });
    });
}
//Deleting particular post code ends


//Updating the particular post code starts
const updateParticularBlogPost = function(req, res, next){
    const token = req.body.token || req.cookies.jwt_access_token;
    const title = req.body.title;
    const postDescription = req.body.postDescription;
    const category = req.body.category;
    const imageDetail = req.body.imageDetail;
    if(!token){
        return res.status(401).json("Not Authenticated");
    }
    jwt.verify(token, jwtPrivateKey, function(error, userInformation){
        const postID = req.params.postID;
        const userID = userInformation.id;
        if(imageDetail == null){
            const updateInfo = {
                postTitle: title,
                postDescription: postDescription,
                categoryID: category
            };
            BlogPost.findByIdAndUpdate(postID, {$set: updateInfo })
            .then((result) => {
                return res.status(200).json("Post has been successfully updated");
            }).catch((err) => {
                console.log(err);
            });
        }
        else{
            const updateInfo = {
                postTitle: title,
                postDescription: postDescription,
                categoryID: category,
                postImage: imageDetail.file.path
            };
            BlogPost.findByIdAndUpdate(postID, {$set: updateInfo })
            .then((result) => {
                return res.status(200).json("Post has been successfully updated");
            }).catch((err) => {
                console.log(err);
            });
        }
    });
}
//Updating the particular post code ends


const getAllBlogPostWithUserAndCategoryInfo = function(req, res, next){
    BlogPost.aggregate([
        {
            $lookup: {
                from: "blogusers",
                localField: "userID",
                foreignField: "_id",
                as: "userDetails"
            }
        },
        {
            $unwind: '$userDetails'
        },
        {
            $lookup: {
                from: 'blogcategories',      
                localField: 'categoryID',
                foreignField: '_id',
                as: 'categoryDetails'
            }
        },
        {
            $unwind: '$categoryDetails'    
        }
    ])
    .then((result) => {
        return res.status(200).json(result);
    }).catch((err) => {
        console.log(err);
    });
}


const getFourBlogPostWithUserAndCategoryInfo = function(req, res, next){
    BlogPost.aggregate([
        {
            $lookup: {
                from: "blogusers",
                localField: "userID",
                foreignField: "_id",
                as: "userDetails"
            }
        },
        {
            $unwind: '$userDetails'
        },
        {
            $lookup: {
                from: 'blogcategories',      
                localField: 'categoryID',
                foreignField: '_id',
                as: 'categoryDetails'
            }
        },
        {
            $unwind: '$categoryDetails'    
        },
        {
            $limit: 4
        },
        {
            $project: {
                _id: 1,
                postTitle: 1,
                postDescription: 1,
                postImage: 1,
                'userDetails.fullName': 1,
                'categoryDetails.categoryName': 1
            }
        }
    ])
    .then((result) => {
        return res.status(200).json(result);
    }).catch((err) => {
        console.log(err);
    });
}


const getFourBlogPostWithUserAndCategoryInfoForParticularCategory = function(req, res, next){
    const categoryID = req.params.categoryID;

    BlogPost.aggregate([
        {
            $match: {
                categoryID: new mongoose.Types.ObjectId(categoryID) 
            }
        },
        {
            $lookup: {
                from: "blogusers",
                localField: "userID",
                foreignField: "_id",
                as: "userDetails"
            }
        },
        {
            $unwind: '$userDetails'
        },
        {
            $lookup: {
                from: 'blogcategories',      
                localField: 'categoryID',
                foreignField: '_id',
                as: 'categoryDetails'
            }
        },
        {
            $unwind: '$categoryDetails'    
        },
        {
            $limit: 4
        },
        {
            $project: {
                _id: 1,
                postTitle: 1,
                postDescription: 1,
                postImage: 1,
                'userDetails.fullName': 1,
                'categoryDetails.categoryName': 1
            }
        }
    ])
    .then((result) => {
        return res.status(200).json(result);
    }).catch((err) => {
        console.log(err);
    });
}


const getParticularBlogPostWithUserAndCategoryInfo = function(req, res, next){
    const postID = req.params.postID;

    BlogPost.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(postID) 
            }
        },
        {
            $lookup: {
                from: "blogusers",
                localField: "userID",
                foreignField: "_id",
                as: "userDetails"
            }
        },
        {
            $unwind: '$userDetails'
        },
        {
            $lookup: {
                from: 'blogcategories',      
                localField: 'categoryID',
                foreignField: '_id',
                as: 'categoryDetails'
            }
        },
        {
            $unwind: '$categoryDetails'    
        },
        {
            $project: {
                _id: 1,
                postTitle: 1,
                postDescription: 1,
                postImage: 1,
                postDateTime: 1,
                'userDetails._id': 1,
                'userDetails.fullName': 1,
                'userDetails.username': 1,
                'userDetails.userProfilePhoto': 1,
                'categoryDetails._id': 1,
                'categoryDetails.categoryName': 1
            }
        }
    ])
    .then((result) => {
        return res.status(200).json(result);
    }).catch((err) => {
        console.log(err);
    });
}


const getBlogPostWithUserAndCategoryInfoWithPagination = function(req, res, next) {
    // Get the page and limit from the query parameters
    const page = parseInt(req.query.page); 
    const limit = parseInt(req.query.limit);  

    // Calculate the number of documents to skip based on the page and limit
    const skip = (page - 1) * limit;

    BlogPost.aggregate([
        {
            $lookup: {
                from: "blogusers",
                localField: "userID",
                foreignField: "_id",
                as: "userDetails"
            }
        },
        {
            $unwind: '$userDetails'
        },
        {
            $lookup: {
                from: 'blogcategories',      
                localField: 'categoryID',
                foreignField: '_id',
                as: 'categoryDetails'
            }
        },
        {
            $unwind: '$categoryDetails'    
        },
        {
            $skip: skip  
        },
        {
            $limit: limit 
        },
        {
            $project: {
                _id: 1,
                postTitle: 1,
                postDescription: 1,
                postImage: 1,
                postDateTime: 1,
                'userDetails._id': 1,
                'userDetails.fullName': 1,
                'userDetails.username': 1,
                'userDetails.userProfilePhoto': 1,
                'categoryDetails._id': 1,
                'categoryDetails.categoryName': 1
            }
        }
    ])
    .then((result) => {
        // To get the total number of documents (for pagination purposes)
        BlogPost.countDocuments()
            .then((totalCount) => {
                const totalPages = Math.ceil(totalCount / limit);  
                return res.status(200).json({
                    currentPage: page,
                    totalPages: totalPages,
                    totalCount: totalCount,
                    blogPostData: result
                });
            })
            .catch((error) => {
                console.log(error);
            });
    })
    .catch((error) => {
        console.log(error);
    });
};


const getBlogPostWithUserAndCategoryInfoForParticularCategoryWithPagination = function(req, res, next) {
    const categoryName = req.params.categoryName;

    // Get the page and limit from the query parameters
    const page = parseInt(req.query.page); 
    const limit = parseInt(req.query.limit);  

    // Calculate the number of documents to skip based on the page and limit
    const skip = (page - 1) * limit;

    BlogPost.aggregate([
        {
            $lookup: {
                from: "blogusers",
                localField: "userID",
                foreignField: "_id",
                as: "userDetails"
            }
        },
        {
            $unwind: '$userDetails'
        },
        {
            $lookup: {
                from: 'blogcategories',      
                localField: 'categoryID',
                foreignField: '_id',
                as: 'categoryDetails'
            }
        },
        {
            $unwind: '$categoryDetails'    
        },
        {
            $match: {
                "categoryDetails.categoryName": categoryName
            }
        },
        {
            $skip: skip  
        },
        {
            $limit: limit 
        },
        {
            $project: {
                _id: 1,
                postTitle: 1,
                postDescription: 1,
                postImage: 1,
                postDateTime: 1,
                'userDetails._id': 1,
                'userDetails.fullName': 1,
                'userDetails.username': 1,
                'userDetails.userProfilePhoto': 1,
                'categoryDetails._id': 1,
                'categoryDetails.categoryName': 1
            }
        }
    ])
    .then((result) => {
        // To get the total number of documents (for pagination purposes)
        BlogPost.aggregate([
            {
                $lookup: {
                    from: 'blogcategories',      
                    localField: 'categoryID',
                    foreignField: '_id',
                    as: 'categoryDetails'
                }
            },
            {
                $unwind: '$categoryDetails'    
            },
            {
                $match: {
                    "categoryDetails.categoryName": categoryName
                }
            },
            {
                $count: "totalCount"
            }
        ])
            .then((countResult) => {
                const totalCount = countResult[0]?.totalCount || 0;
                const totalPages = Math.ceil(totalCount / limit);  
                return res.status(200).json({
                    currentPage: page,
                    totalPages: totalPages,
                    totalCount: totalCount,
                    blogPostData: result
                });
            })
            .catch((error) => {
                console.log(error);
            });
    })
    .catch((error) => {
        console.log(error);
    });
};


const getBlogPostWithUserAndCategoryForParticularUserInfoWithPagination = function(req, res, next) {
    const username = req.params.username;

    // Get the page and limit from the query parameters
    const page = parseInt(req.query.page); 
    const limit = parseInt(req.query.limit);  

    // Calculate the number of documents to skip based on the page and limit
    const skip = (page - 1) * limit;

    BlogPost.aggregate([
        {
            $lookup: {
                from: "blogusers",
                localField: "userID",
                foreignField: "_id",
                as: "userDetails"
            }
        },
        {
            $unwind: '$userDetails'
        },
        {
            $lookup: {
                from: 'blogcategories',      
                localField: 'categoryID',
                foreignField: '_id',
                as: 'categoryDetails'
            }
        },
        {
            $unwind: '$categoryDetails'    
        },
        {
            $match: {
                "userDetails.username": username
            }
        },
        {
            $skip: skip  
        },
        {
            $limit: limit 
        },
        {
            $project: {
                _id: 1,
                postTitle: 1,
                postDescription: 1,
                postImage: 1,
                postDateTime: 1,
                'userDetails._id': 1,
                'userDetails.fullName': 1,
                'userDetails.username': 1,
                'userDetails.userProfilePhoto': 1,
                'categoryDetails._id': 1,
                'categoryDetails.categoryName': 1
            }
        }
    ])
    .then((result) => {
        // To get the total number of documents (for pagination purposes)
        BlogPost.aggregate([
            {
                $lookup: {
                    from: "blogusers",
                    localField: "userID",
                    foreignField: "_id",
                    as: "userDetails"
                }
            },
            {
                $unwind: "$userDetails" 
            },
            {
                $match: {
                    "userDetails.username": username
                }
            },
            {
                $count: "totalCount"
            }
        ])
            .then((countResult) => {
                const totalCount = countResult[0]?.totalCount || 0;
                const totalPages = Math.ceil(totalCount / limit);  
                return res.status(200).json({
                    currentPage: page,
                    totalPages: totalPages,
                    totalCount: totalCount,
                    blogPostData: result
                });
            })
            .catch((error) => {
                console.log(error);
            });
    })
    .catch((error) => {
        console.log(error);
    });
};


const getBlogPostedUniqueUsersDetails = function(req, res, next){
    BlogPost.distinct('userID')
    .then((distintUsersId) => {
        BlogUser.find({_id: {$in: distintUsersId}})
        .select(' _id fullName username')
        .then((usersDetails) => {
            return res.status(200).json(usersDetails);
        })
        .catch((error) => {
            console.log(error);
        })
    })
    .catch((error) => {
        console.log(error);
    });
}


const getBlogPostedUniqueUsersDetailsForParticularCategory = function(req, res, next){
    const categoryName = req.params.categoryName;

    BlogCategory.findOne({ categoryName: categoryName })
    .then((category) => {
        BlogPost.distinct('userID', { categoryID: category._id })
        .then((distintUsersId)=>{
            BlogUser.find({_id: {$in: distintUsersId}})
            .select(' _id fullName username')
            .then((usersDetails) => {
                return res.status(200).json(usersDetails);
            })
            .catch((error) => {
                console.log(error);
            })
            })
        .catch((error) => {
            console.log(error);
        })
    })
    .catch((error) => {
        console.log(error)
    })
}


const getBlogPostedUniqueCategoriesDetails = function(req, res, next){
    BlogPost.distinct('categoryID')
    .then((distintCategoriesId) => {
        BlogCategory.find({_id: {$in: distintCategoriesId}})
        .select(' _id categoryName')
        .then((categoriesDetails) => {
            return res.status(200).json(categoriesDetails);
        })
        .catch((error) => {
            console.log(error);
        })
    })
    .catch((error) => {
        console.log(error);
    });
}


const getBlogPostedUniqueCategoriesDetailsForParticularUser = function(req, res, next){
    const username = req.params.username;

    BlogUser.findOne({ username: username })
    .then((usersDetails) => {
        BlogPost.distinct('categoryID', { userID: usersDetails._id })
        .then((distintCategoriesId)=>{
            BlogCategory.find({_id: {$in: distintCategoriesId}})
            .select(' _id categoryName')
            .then((categoriesDetails) => {
                return res.status(200).json(categoriesDetails);
            })
            .catch((error) => {
                console.log(error);
            })
            })
        .catch((error) => {
            console.log(error);
        })
    })
    .catch((error) => {
        console.log(error)
    })
}


const getBlogPostDetailsWithFilterSortWithPagination = function(req, res, next) {
    const sortSelection = req.body.sortSelection;
    const allCheckedCategory = req.body.allCheckedCategory;
    const allCheckedAuthor = req.body.allCheckedAuthor;
    const checkedDate = req.body.checkedDate;

    // Get the page and limit from the query parameters
    const page = parseInt(req.query.page); 
    const limit = parseInt(req.query.limit);  

    // Calculate the number of documents to skip based on the page and limit
    const skip = (page - 1) * limit;

    const matchStage = {};

    // Filter by selected categories
    if (Array.isArray(allCheckedCategory) && allCheckedCategory.length > 0) {
        matchStage.categoryID = {
            $in: allCheckedCategory.map(id => new mongoose.Types.ObjectId(id))
        };
    }

    // Filter by selected authors
    if (Array.isArray(allCheckedAuthor) && allCheckedAuthor.length > 0) {
        matchStage.userID = {
            $in: allCheckedAuthor.map(id => new mongoose.Types.ObjectId(id))
        };
    }

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
        const timeAgo = new Date(now.getTime() - (timeMap[checkedDate] || 0));
        matchStage.postDateTime = { $gte: timeAgo };
    }


    let sortStage = { postDateTime: -1 }; 

    if (sortSelection && sortSelection !== "") {
        if (sortSelection === "postTitleAscending") {
            sortStage = { postTitle: 1 };
        } else if (sortSelection === "postTitleDescending") {
            sortStage = { postTitle: -1 };
        } else if (sortSelection === "authorAscending") {
            sortStage = { "userDetails.fullName": 1 };
        } else if (sortSelection === "authorDescending") {
            sortStage = { "userDetails.fullName": -1 };
        } else if (sortSelection === "categoryAscending") {
            sortStage = { "categoryDetails.categoryName": 1 };
        } else if (sortSelection === "categoryDescending") {
            sortStage = { "categoryDetails.categoryName": -1 };
        } else if (sortSelection === "postDateAscending") {
            sortStage = { postDateTime: 1 };
        } else if (sortSelection === "postDateDescending") {
            sortStage = { postDateTime: -1 };
        } else if (sortSelection === "postLengthAscending") {
            sortStage = { postDescriptionLength: 1 };
        } else if (sortSelection === "postLengthDescending") {
            sortStage = { postDescriptionLength: -1 };
        }
    }


    BlogPost.aggregate([
        {
            $addFields: {
                postDescriptionLength: {
                    $strLenCP: "$postDescription"
                }
            }
        },
        {
            $match: matchStage
        },
        {
            $lookup: {
                from: "blogusers",
                localField: "userID",
                foreignField: "_id",
                as: "userDetails"
            }
        },
        {
            $unwind: "$userDetails"
        },
        {
            $lookup: {
                from: "blogcategories",
                localField: "categoryID",
                foreignField: "_id",
                as: "categoryDetails"
            }
        },
        {
            $unwind: "$categoryDetails"
        },
        {
            $sort: sortStage
        },
        {
            $skip: skip
        },
        {
            $limit: limit
        },
        {
            $project: {
                _id: 1,
                postTitle: 1,
                postDescription: 1,
                postImage: 1,
                postDateTime: 1,
                postDescriptionLength: 1,
                "userDetails._id": 1,
                "userDetails.fullName": 1,
                "userDetails.username": 1,
                "categoryDetails._id": 1,
                "categoryDetails.categoryName": 1
            }
        }
    ])
    .then((blogPostResults)=>{
        BlogPost.aggregate([
            {
                $addFields: {
                    postDescriptionLength: {
                        $strLenCP: "$postDescription"
                    }
                }
            },
            {
                $match: matchStage
            },
            {
                $lookup: {
                    from: "blogusers",
                    localField: "userID",
                    foreignField: "_id",
                    as: "userDetails"
                }
            },
            {
                $unwind: "$userDetails"
            }, 
            {
                $lookup: {
                    from: "blogcategories",
                    localField: "categoryID",
                    foreignField: "_id",
                    as: "categoryDetails"
                }
            },
            {
                $unwind: "$categoryDetails"
            },
            {
                $count: "totalCount"
            }
        ])
        .then((countResult)=>{
            const totalCount = countResult[0]?.totalCount || 0;
            const totalPages = Math.ceil(totalCount / limit);
            return res.status(200).json({
                currentPage: parseInt(page),
                totalPages,
                totalCount,
                blogPostData: blogPostResults
            });
        })
        .catch((error) => {
            console.log(error);
        })
    })
    .catch((error) => {
        console.log(error);
    })
}


const getBlogPostDetailsWithFilterSortWithPaginationForParticularUser = function(req, res, next){
    const username = req.params.username;

    const sortSelection = req.body.sortSelection;
    const allCheckedCategory = req.body.allCheckedCategory;
    const checkedDate = req.body.checkedDate;

    // Get the page and limit from the query parameters
    const page = parseInt(req.query.page); 
    const limit = parseInt(req.query.limit);  

    // Calculate the number of documents to skip based on the page and limit
    const skip = (page - 1) * limit;

    // Initialize the match stage object to filter posts
    const matchStage = {};

    BlogUser.findOne({ username: username })
    .then((usersDetails) => {
        // Filter by the specific user's posts
        matchStage.userID = usersDetails._id;

        // Filter by selected categories if provided
        if (Array.isArray(allCheckedCategory) && allCheckedCategory.length > 0) {
            matchStage.categoryID = {
                $in: allCheckedCategory.map(id => new mongoose.Types.ObjectId(id))
            };
        }

        // Filter by selected date if provided
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
            const timeAgo = new Date(now.getTime() - (timeMap[checkedDate] || 0));
            matchStage.postDateTime = { $gte: timeAgo };
        }

        // Set up the sorting stage based on the sortSelection
        let sortStage = { postDateTime: -1 };  

        if (sortSelection && sortSelection !== "") {
            if (sortSelection === "postTitleAscending") {
                sortStage = { postTitle: 1 };
            } else if (sortSelection === "postTitleDescending") {
                sortStage = { postTitle: -1 };
            } else if (sortSelection === "authorAscending") {
                sortStage = { "userDetails.fullName": 1 };
            } else if (sortSelection === "authorDescending") {
                sortStage = { "userDetails.fullName": -1 };
            } else if (sortSelection === "categoryAscending") {
                sortStage = { "categoryDetails.categoryName": 1 };
            } else if (sortSelection === "categoryDescending") {
                sortStage = { "categoryDetails.categoryName": -1 };
            } else if (sortSelection === "postDateAscending") {
                sortStage = { postDateTime: 1 };
            } else if (sortSelection === "postDateDescending") {
                sortStage = { postDateTime: -1 };
            } else if (sortSelection === "postLengthAscending") {
                sortStage = { postDescriptionLength: 1 };
            } else if (sortSelection === "postLengthDescending") {
                sortStage = { postDescriptionLength: -1 };
            }
        }

        // Perform the aggregation pipeline for retrieving the blog posts with filtering, sorting, and pagination
        BlogPost.aggregate([
            {
                $addFields: {
                    postDescriptionLength: {
                        $strLenCP: "$postDescription"
                    }
                }
            },
            {
                $match: matchStage
            },
            {
                $lookup: {
                    from: "blogusers",
                    localField: "userID",
                    foreignField: "_id",
                    as: "userDetails"
                }
            },
            {
                $unwind: "$userDetails"
            },
            {
                $lookup: {
                    from: "blogcategories",
                    localField: "categoryID",
                    foreignField: "_id",
                    as: "categoryDetails"
                }
            },
            {
                $unwind: "$categoryDetails"
            },
            {
                $sort: sortStage
            },
            {
                $skip: skip
            },
            {
                $limit: limit
            },
            {
                $project: {
                    _id: 1,
                    postTitle: 1,
                    postDescription: 1,
                    postImage: 1,
                    postDateTime: 1,
                    postDescriptionLength: 1,
                    "userDetails._id": 1,
                    "userDetails.fullName": 1,
                    "userDetails.username": 1,
                    "categoryDetails._id": 1,
                    "categoryDetails.categoryName": 1
                }
            }
        ])
        .then((blogPostResults) => {
            // Perform a count operation to get the total number of posts matching the filters
            BlogPost.aggregate([
                {
                    $addFields: {
                        postDescriptionLength: {
                            $strLenCP: "$postDescription"
                        }
                    }
                },
                {
                    $match: matchStage
                },
                {
                    $lookup: {
                        from: "blogusers",
                        localField: "userID",
                        foreignField: "_id",
                        as: "userDetails"
                    }
                },
                {
                    $unwind: "$userDetails"
                }, 
                {
                    $lookup: {
                        from: "blogcategories",
                        localField: "categoryID",
                        foreignField: "_id",
                        as: "categoryDetails"
                    }
                },
                {
                    $unwind: "$categoryDetails"
                },
                {
                    $count: "totalCount"
                }
            ])
            .then((countResult) => {
                const totalCount = countResult[0]?.totalCount || 0;
                const totalPages = Math.ceil(totalCount / limit);
                return res.status(200).json({
                    currentPage: parseInt(page),
                    totalPages,
                    totalCount,
                    blogPostData: blogPostResults
                });
            })
            .catch((error) => {
                console.log(error);
            })
        })
        .catch((error) => {
            console.log(error);
        })

    })
    .catch((error) => {
        console.log(error);
    })
}


const getBlogPostDetailsWithFilterSortWithPaginationForParticularCategory = function(req, res, next){
    const categoryName = req.params.categoryName;

    const sortSelection = req.body.sortSelection;
    const allCheckedAuthor = req.body.allCheckedAuthor;
    const checkedDate = req.body.checkedDate;

    // Get the page and limit from the query parameters
    const page = parseInt(req.query.page); 
    const limit = parseInt(req.query.limit);  

    // Calculate the number of documents to skip based on the page and limit
    const skip = (page - 1) * limit;

    // Initialize the match stage object to filter posts
    const matchStage = {};

    BlogCategory.findOne({ categoryName: categoryName })
    .then((category) => {
        // Filter by category ID
        matchStage.categoryID = category._id;

        // Filter by selected authors if provided
        if (Array.isArray(allCheckedAuthor) && allCheckedAuthor.length > 0) {
            matchStage.userID = {
                $in: allCheckedAuthor.map(id => new mongoose.Types.ObjectId(id))
            };
        }

        // Filter by date
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
            const timeAgo = new Date(now.getTime() - (timeMap[checkedDate] || 0));
            matchStage.postDateTime = { $gte: timeAgo };
        }

        // Set up the sorting stage based on the sortSelection
        let sortStage = { postDateTime: -1 };  

        if (sortSelection && sortSelection !== "") {
            if (sortSelection === "postTitleAscending") {
                sortStage = { postTitle: 1 };
            } else if (sortSelection === "postTitleDescending") {
                sortStage = { postTitle: -1 };
            } else if (sortSelection === "authorAscending") {
                sortStage = { "userDetails.fullName": 1 };
            } else if (sortSelection === "authorDescending") {
                sortStage = { "userDetails.fullName": -1 };
            } else if (sortSelection === "categoryAscending") {
                sortStage = { "categoryDetails.categoryName": 1 };
            } else if (sortSelection === "categoryDescending") {
                sortStage = { "categoryDetails.categoryName": -1 };
            } else if (sortSelection === "postDateAscending") {
                sortStage = { postDateTime: 1 };
            } else if (sortSelection === "postDateDescending") {
                sortStage = { postDateTime: -1 };
            } else if (sortSelection === "postLengthAscending") {
                sortStage = { postDescriptionLength: 1 };
            } else if (sortSelection === "postLengthDescending") {
                sortStage = { postDescriptionLength: -1 };
            }
        }

        // Perform the aggregation pipeline for retrieving the blog posts with filtering, sorting, and pagination
        BlogPost.aggregate([
            {
                $addFields: {
                    postDescriptionLength: {
                        $strLenCP: "$postDescription"
                    }
                }
            },
            {
                $match: matchStage
            },
            {
                $lookup: {
                    from: "blogusers",
                    localField: "userID",
                    foreignField: "_id",
                    as: "userDetails"
                }
            },
            { 
                $unwind: "$userDetails" 
            },
            {
                $lookup: {
                    from: "blogcategories",
                    localField: "categoryID",
                    foreignField: "_id",
                    as: "categoryDetails"
                }
            },
            { 
                $unwind: "$categoryDetails" 
            },
            { 
                $sort: sortStage 
            },
            { 
                $skip: skip 
            },
            { 
                $limit: limit 
            },
            {
                $project: {
                    _id: 1,
                    postTitle: 1,
                    postDescription: 1,
                    postImage: 1,
                    postDateTime: 1,
                    postDescriptionLength: 1,
                    "userDetails._id": 1,
                    "userDetails.fullName": 1,
                    "userDetails.username": 1,
                    "categoryDetails._id": 1,
                    "categoryDetails.categoryName": 1
                }
            }
        ])
        .then((blogPostResults) => {
            // Perform a count operation to get the total number of posts matching the filters
            BlogPost.aggregate([
                {
                    $addFields: {
                        postDescriptionLength: {
                            $strLenCP: "$postDescription"
                        }
                    }
                },
                { 
                    $match: matchStage 
                },
                {
                    $lookup: {
                        from: "blogusers",
                        localField: "userID",
                        foreignField: "_id",
                        as: "userDetails"
                    }
                },
                { 
                    $unwind: "$userDetails" 
                },
                {
                    $lookup: {
                        from: "blogcategories",
                        localField: "categoryID",
                        foreignField: "_id",
                        as: "categoryDetails"
                    }
                },
                { 
                    $unwind: "$categoryDetails" 
                },
                { 
                    $count: "totalCount" 
                }
            ])
            .then((countResult) => {
                const totalCount = countResult[0]?.totalCount || 0;
                const totalPages = Math.ceil(totalCount / limit);
                return res.status(200).json({
                    currentPage: parseInt(page),
                    totalPages,
                    totalCount,
                    blogPostData: blogPostResults
                });
            })
            .catch((error) => {
                console.log(error);
            })

        })
        .catch((error) => {
            console.log(error);
        })

    })
    .catch((error) => {
        console.log(error);
    })
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