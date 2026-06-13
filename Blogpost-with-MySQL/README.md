# AI-Powered Blog Application - MySQL Backend

A Node.js backend API for an AI-powered blogging platform built with MySQL. The backend provides authentication, blog management, category management, comments, likes, image uploads, user profile management, search functionality, and AI-powered content processing.

This backend follows a modular architecture using controllers, routes, and dedicated SQL query modules to keep business logic and database operations organized and maintainable.

---

# Table of Contents

* Overview
* Features
* Tech Stack
* Project Structure
* API Modules
* Database Query Layer
* Installation
* Environment Variables
* Running the Server
* Application Architecture
* Authentication
* User Management
* Blog Management
* Categories
* Comments
* Likes
* Search Functionality
* AI Integration
* Image Upload System
* Database Layer
* Project Workflow
* Security
* Deployment
* Contributing
* License

---

# Overview

This project is the MySQL backend implementation for the AI-Powered Blog Application.

The backend exposes REST APIs that power the frontend application and support:

* User authentication
* User profile management
* Blog creation
* Blog updates
* Blog discovery
* Category management
* Comments
* Likes
* Search functionality
* Image uploads
* AI-powered content processing

Unlike the MongoDB version, this implementation uses dedicated SQL query modules for database interactions.

The backend architecture follows:

```text
Routes
   ↓
Controllers
   ↓
SQL Query Layer
   ↓
MySQL Database
```

---

# Features

## Authentication

Supports:

* User Registration
* User Login
* JWT Authentication
* Authorization
* Session Management

### Files

```text
controllers/
└── authorizationController.js

routes/
└── authorizationRoute.js

sqlQueries/
└── authorizationQuery.js
```

---

## User Management

Supports:

* User Profile Retrieval
* User Profile Updates
* User Information Management

### Files

```text
controllers/
└── blogUserController.js

routes/
└── blogUserRoute.js

sqlQueries/
└── blogUserQuery.js
```

---

## Blog Management

Supports:

* Create Blog Posts
* Read Blog Posts
* Update Blog Posts
* Delete Blog Posts
* Retrieve Blog Details

### Files

```text
controllers/
└── blogPostController.js

routes/
└── blogPostRoute.js

sqlQueries/
└── blogPostQuery.js
```

---

## Category Management

Supports:

* Category Retrieval
* Blog Categories
* Category-Based Filtering

### Files

```text
controllers/
└── blogCategoryListController.js

routes/
└── blogCategoryListRoute.js

sqlQueries/
└── blogCategoryListQuery.js
```

---

## Comment System

Supports:

* Add Comments
* Retrieve Comments
* Blog Discussions

### Files

```text
controllers/
└── blogPostCommentController.js

routes/
└── blogPostCommentRoute.js

sqlQueries/
└── blogPostCommentQuery.js
```

---

## Like System

Supports:

* Like Blog Posts
* Retrieve Like Information
* User Interaction Tracking

### Files

```text
controllers/
└── blogPostLikeController.js

routes/
└── blogPostLikeRoute.js

sqlQueries/
└── blogPostLikeQuery.js
```

---

## Search Functionality

Supports:

* Blog Search
* Category Search
* User-Based Filtering

### Files

```text
controllers/
└── searchUserCategoryBlogController.js

routes/
└── searchUserCategoryBlogRoute.js
```

---

## AI Features

The backend contains dedicated AI modules.

### Files

```text
controllers/
└── generativeAIController.js

routes/
└── generativeAIRoute.js
```

Based on the repository structure, the backend appears to support:

* AI-generated summaries
* AI-powered content processing
* Generative AI integration

---

## Image Uploads

Supports:

* Blog Image Uploads
* Cloudinary Integration
* File Processing

### Files

```text
controllers/
└── imageUploadController.js

routes/
└── imageUploadRoute.js
```

---

# Tech Stack

| Category       | Technology                      |
| -------------- | ------------------------------- |
| Runtime        | Node.js                         |
| API Framework  | Express.js (inferred)           |
| Database       | MySQL                           |
| Authentication | JWT                             |
| AI Services    | Google Generative AI (inferred) |
| File Uploads   | Multer                          |
| Cloud Storage  | Cloudinary                      |
| Configuration  | dotenv                          |

---

# Project Structure

```text
Blogpost-with-MySQL/
├── config/
├── controllers/
├── routes/
├── sqlQueries/
├── utils/
├── index.js
├── package.json
└── .gitignore
```

---

# Directory Overview

## config/

Application configuration files.

```text
config/
├── cloudinaryConfig.js
├── databaseConfig.js
└── multerConfig.js
```

Responsibilities:

* Database Connection
* Cloudinary Configuration
* Upload Configuration

---

## controllers/

Contains business logic and request handling.

```text
controllers/
├── authorizationController.js
├── blogCategoryListController.js
├── blogPostCommentController.js
├── blogPostController.js
├── blogPostLikeController.js
├── blogUserController.js
├── generativeAIController.js
├── imageUploadController.js
└── searchUserCategoryBlogController.js
```

---

## routes/

Contains API route definitions.

```text
routes/
├── authorizationRoute.js
├── blogCategoryListRoute.js
├── blogPostCommentRoute.js
├── blogPostLikeRoute.js
├── blogPostRoute.js
├── blogUserRoute.js
├── generativeAIRoute.js
├── imageUploadRoute.js
└── searchUserCategoryBlogRoute.js
```

---

## sqlQueries/

Contains all database operations.

```text
sqlQueries/
├── authorizationQuery.js
├── blogCategoryListQuery.js
├── blogPostCommentQuery.js
├── blogPostLikeQuery.js
├── blogPostQuery.js
├── blogUserQuery.js
└── multipleTablesJoinQuery.js
```

This layer is responsible for interacting directly with the MySQL database.

---

## utils/

Contains reusable helper functions.

```text
utils/
└── functions.js
```

---

# Database Query Layer

Unlike the MongoDB version, this backend organizes database operations into dedicated query files.

## Authentication Queries

```text
authorizationQuery.js
```

Handles authentication-related database operations.

---

## User Queries

```text
blogUserQuery.js
```

Handles user-related database operations.

---

## Blog Queries

```text
blogPostQuery.js
```

Handles blog CRUD operations.

---

## Category Queries

```text
blogCategoryListQuery.js
```

Handles category retrieval and filtering.

---

## Comment Queries

```text
blogPostCommentQuery.js
```

Handles comment operations.

---

## Like Queries

```text
blogPostLikeQuery.js
```

Handles like-related operations.

---

## Join Queries

```text
multipleTablesJoinQuery.js
```

Contains queries involving multiple table relationships.

---

# Installation

## Clone Repository

```bash
git clone <repository-url>
```

Navigate to the MySQL backend:

```bash
cd Blogpost-with-MySQL
```

Install dependencies:

```bash
npm install
```

---

# Environment Variables

Create a `.env` file inside the backend directory.

```env
databaseURL=

jwtPrivateKey=jwtPrivateKey

environment=DEVELOPMENT

frontEndHost=https://ai-powered-blog-application.netlify.app

PORT=8080

CLOUDINARY_CLOUD_NAME=

CLOUDINARY_API_KEY=

CLOUDINARY_API_SECRET=

CLOUDINARY_URL=

GOOGLE_SERVICE_ACCOUNT='{
  "type":"service_account",
  "project_id":"",
  "private_key_id":"",
  "private_key":"",
  "client_email":"",
  "client_id":"",
  "auth_uri":"",
  "token_uri":"",
  "auth_provider_x509_cert_url":"",
  "client_x509_cert_url":"",
  "universe_domain":"googleapis.com"
}'
```

---

# Environment Variable Description

| Variable               | Description             |
| ---------------------- | ----------------------- |
| databaseURL            | MySQL Connection String |
| jwtPrivateKey          | JWT Signing Secret      |
| environment            | Current Environment     |
| frontEndHost           | Allowed Frontend Origin |
| PORT                   | Server Port             |
| CLOUDINARY_CLOUD_NAME  | Cloudinary Cloud Name   |
| CLOUDINARY_API_KEY     | Cloudinary API Key      |
| CLOUDINARY_API_SECRET  | Cloudinary Secret       |
| CLOUDINARY_URL         | Cloudinary URL          |
| GOOGLE_SERVICE_ACCOUNT | Google AI Credentials   |

---

# Running the Server

Start the server:

```bash
npm start
```

Server URL:

```text
http://localhost:8080
```

or the configured PORT value.

---

# Application Architecture

The backend follows a layered architecture.

```text
Client Request
       ↓
Route
       ↓
Controller
       ↓
SQL Query Layer
       ↓
MySQL Database
       ↓
Response
```

---

# Authentication

Authentication is managed through:

```text
authorizationRoute.js
authorizationController.js
authorizationQuery.js
```

The application uses JWT-based authentication for protecting resources.

---

# User Management

Responsible modules:

```text
blogUserRoute.js
blogUserController.js
blogUserQuery.js
```

Supports user profile operations and user-related data management.

---

# Blog Management

Responsible modules:

```text
blogPostRoute.js
blogPostController.js
blogPostQuery.js
```

Supports:

* Create Posts
* Retrieve Posts
* Update Posts
* Delete Posts

---

# Categories

Responsible modules:

```text
blogCategoryListRoute.js
blogCategoryListController.js
blogCategoryListQuery.js
```

Supports category retrieval and organization.

---

# Comments

Responsible modules:

```text
blogPostCommentRoute.js
blogPostCommentController.js
blogPostCommentQuery.js
```

Handles blog discussions and user engagement.

---

# Likes

Responsible modules:

```text
blogPostLikeRoute.js
blogPostLikeController.js
blogPostLikeQuery.js
```

Tracks user interactions with blog posts.

---

# Search Functionality

Responsible modules:

```text
searchUserCategoryBlogRoute.js
searchUserCategoryBlogController.js
```

Supports content discovery and filtering.

---

# AI Integration

The project contains dedicated AI-related modules.

```text
generativeAIRoute.js
generativeAIController.js
```

Based on the repository structure, the AI workflow likely follows:

```text
Blog Content
      ↓
AI Processing
      ↓
Generated Result
      ↓
API Response
```

Possible use cases include:

* Blog summaries
* Content enhancement
* AI-assisted content generation

---

# Image Upload System

Image uploads are handled through:

```text
multerConfig.js
imageUploadController.js
cloudinaryConfig.js
```

Workflow:

```text
User Upload
      ↓
Multer
      ↓
Cloudinary
      ↓
Image URL
      ↓
API Response
```

---

# Database Layer

The MySQL backend separates SQL operations into dedicated query modules.

```text
sqlQueries/
├── authorizationQuery.js
├── blogCategoryListQuery.js
├── blogPostCommentQuery.js
├── blogPostLikeQuery.js
├── blogPostQuery.js
├── blogUserQuery.js
└── multipleTablesJoinQuery.js
```

This separation improves:

* Maintainability
* Scalability
* Query Reusability
* Code Organization

---

# Project Workflow

```text
Frontend
    ↓
API Routes
    ↓
Controllers
    ↓
SQL Query Layer
    ↓
MySQL Database
    ↓
Response
```

---

# Security

The project includes support for:

* JWT Authentication
* Environment Variables
* Cloudinary Credential Isolation
* Protected API Resources

Recommended production practices:

* Use HTTPS
* Secure database credentials
* Restrict CORS origins
* Rotate secrets regularly

---

# Deployment

This backend can be deployed on any Node.js hosting provider, including:

* Render
* Railway
* AWS EC2
* DigitalOcean
* VPS Servers

Deployment requirements:

* Node.js Runtime
* MySQL Database
* Cloudinary Credentials
* Google AI Credentials
* Environment Variables

---

# Contributing

Contributions are welcome.

## Create Feature Branch

```bash
git checkout -b feature/new-feature
```

## Commit Changes

```bash
git commit -m "Add new feature"
```

## Push Changes

```bash
git push origin feature/new-feature
```

## Create Pull Request

Submit a Pull Request for review.

---

# License

This project is licensed under the MIT License.

If a separate license file exists in the repository, please refer to that file for the official licensing terms.
