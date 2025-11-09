// Import Dependencies
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Import Config Files
const { connectDatabase } = require("./config/databaseConfig");

// Import Routes
const authorizationRoute = require("./routes/authorizationRoute");
const blogUserRoute = require("./routes/blogUserRoute");
const blogPostRoute = require("./routes/blogPostRoute");
const blogPostCommentRoute = require("./routes/blogPostCommentRoute");
const blogPostLikeRoute = require("./routes/blogPostLikeRoute");
const blogCategoryListRoute = require("./routes/blogCategoryListRoute");
const searchUserCategoryBlogRoute = require("./routes/searchUserCategoryBlogRoute");
const imageUploadRoute = require("./routes/imageUploadRoute");
const generativeAIRoute = require("./routes/generativeAIRoute");


// 🔧 Initialize Express App
const app = express();


// Environment Variables
dotenv.config({path: "./config.env"});


// CORS Configuration
let corsOption;

if(process.env.environment == "DEVELOPMENT"){
    corsOption = {
        origin : "http://localhost:3000",
        credentials: true,
        allowedHeaders: ['Content-Type', 'Authorization']
    }
}
else if(process.env.environment == "PRODUCTION"){
    corsOption = {
        origin : process.env.frontEndHost,
        credentials: true,
        allowedHeaders: ['Content-Type', 'Authorization']
    }
}

app.use(cors(corsOption));


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Database Connection
connectDatabase();


// API Routes
app.use("/api/authorization/", authorizationRoute);

app.use("/api/blogUser/", blogUserRoute);

app.use("/api/blogPost/", blogPostRoute);

app.use("/api/blogPost/comment/", blogPostCommentRoute);

app.use("/api/blogPost/blogPostLike/", blogPostLikeRoute);

app.use("/api/blog/categoryList/", blogCategoryListRoute);

app.use("/api/searchBlogOrUserOrCategory/", searchUserCategoryBlogRoute);

app.use("/api/imageUpload/", imageUploadRoute);

app.use("/api/generativeAI/", generativeAIRoute);


// Start Server
const port = process.env.PORT || 8080;

app.listen(port, function(){
    console.log(`Connected to backend in ${port}`);
});
