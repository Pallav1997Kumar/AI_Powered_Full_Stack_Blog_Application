# AI-Powered Blog Application - MongoDB Backend

A Node.js backend API for an AI-powered blogging platform built with MongoDB. The backend provides authentication, blog management, category management, comments, likes, image uploads, user profile management, search functionality, and AI-powered content processing.

---

# Table of Contents

* Overview
* Features
* Tech Stack
* Project Structure
* API Modules
* Database Models
* Installation
* Environment Variables
* Running the Server
* Application Architecture
* Authentication
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

This project is the MongoDB backend implementation for the AI-Powered Blog Application.

The backend exposes REST APIs that support:

* User authentication
* User profile management
* Blog creation
* Blog editing
* Blog discovery
* Blog categorization
* Commenting system
* Like system
* Image uploads
* AI-powered content features

The backend follows a structured architecture based on:

```text
Routes
   ↓
Controllers
   ↓
Database Models
   ↓
MongoDB
```

---

# Features

## Authentication

Supports:

* User Registration
* User Login
* JWT Authentication
* Authorization
* User Session Management

### Files

```text
controllers/
└── authorizationController.js

routes/
└── authorizationRoute.js
```

---

## User Management

Supports:

* User Profile Retrieval
* Profile Updates
* User Data Management

### Files

```text
controllers/
└── blogUserController.js

routes/
└── blogUserRoute.js
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
```

---

## Category Management

Supports:

* Category Listing
* Category-Based Filtering
* Category Retrieval

### Files

```text
controllers/
└── blogCategoryListController.js

routes/
└── blogCategoryListRoute.js
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

The backend includes dedicated AI modules.

### Files

```text
controllers/
└── generativeAIController.js

routes/
└── generativeAIRoute.js

googleAuthToken.js
```

Based on the repository structure, the backend appears to support:

* AI-generated blog summaries
* AI-powered content processing
* Generative AI integration

---

## Image Uploads

Supports:

* Image Upload API
* Cloudinary Storage
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

| Category                  | Technology                      |
| ------------------------- | ------------------------------- |
| Runtime                   | Node.js                         |
| API Framework             | Express.js (inferred)           |
| Database                  | MongoDB                         |
| Authentication            | JWT                             |
| AI Services               | Google Generative AI (inferred) |
| File Upload               | Multer                          |
| Cloud Storage             | Cloudinary                      |
| Environment Configuration | dotenv                          |

---

# Project Structure

```text
Blogpost-with-MongoDB/
├── config/
├── controllers/
├── database-models/
├── routes/
├── utils/
├── server.js
├── googleAuthToken.js
├── package.json
└── .gitignore
```

---

## Directory Overview

### config/

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
* File Upload Configuration

---

### controllers/

Contains business logic.

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

### database-models/

Contains MongoDB models.

```text
database-models/
├── blogCategory.js
├── blogPost.js
├── blogPostComment.js
├── blogPostLike.js
└── blogUser.js
```

---

### routes/

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

### utils/

Contains helper functions.

```text
utils/
└── functions.js
```

---

# Database Models

The application is built around five primary MongoDB models.

## Blog User

```text
blogUser.js
```

Represents registered users of the platform.

---

## Blog Post

```text
blogPost.js
```

Represents published blog content.

---

## Blog Category

```text
blogCategory.js
```

Represents blog categories.

---

## Blog Comment

```text
blogPostComment.js
```

Represents user comments on blog posts.

---

## Blog Like

```text
blogPostLike.js
```

Represents blog likes and user interactions.

---

# Installation

## Clone Repository

```bash
git clone <repository-url>
```

Navigate to the MongoDB backend:

```bash
cd Blogpost-with-MongoDB
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

## Environment Variable Description

| Variable               | Description               |
| ---------------------- | ------------------------- |
| databaseURL            | MongoDB Connection String |
| jwtPrivateKey          | JWT Signing Secret        |
| environment            | Application Environment   |
| frontEndHost           | Allowed Frontend Origin   |
| PORT                   | API Port                  |
| CLOUDINARY_CLOUD_NAME  | Cloudinary Cloud Name     |
| CLOUDINARY_API_KEY     | Cloudinary API Key        |
| CLOUDINARY_API_SECRET  | Cloudinary Secret         |
| CLOUDINARY_URL         | Cloudinary URL            |
| GOOGLE_SERVICE_ACCOUNT | Google AI Service Account |

---

# Running the Server

Start development server:

```bash
npm start
```

Server runs on:

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
MongoDB Model
       ↓
MongoDB
       ↓
Response
```

---

# Authentication

Authentication is handled through dedicated route and controller modules.

```text
authorizationRoute.js
authorizationController.js
```

The application uses JWT-based authentication for protecting resources and validating users.

---

# Blog Management

Responsible modules:

```text
blogPostRoute.js
blogPostController.js
blogPost.js
```

Supports:

* Blog creation
* Blog retrieval
* Blog updates
* Blog deletion

---

# Categories

Responsible modules:

```text
blogCategoryListRoute.js
blogCategoryListController.js
blogCategory.js
```

Used for category organization and filtering.

---

# Comments

Responsible modules:

```text
blogPostCommentRoute.js
blogPostCommentController.js
blogPostComment.js
```

Used for blog discussions and engagement.

---

# Likes

Responsible modules:

```text
blogPostLikeRoute.js
blogPostLikeController.js
blogPostLike.js
```

Tracks user interactions with posts.

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

The backend includes dedicated AI-related modules.

```text
generativeAIRoute.js
generativeAIController.js
googleAuthToken.js
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

MongoDB operations are performed using dedicated models.

```text
blogUser.js
blogPost.js
blogCategory.js
blogPostComment.js
blogPostLike.js
```

This structure keeps database logic organized and maintainable.

---

# Project Workflow

```text
Frontend
    ↓
API Routes
    ↓
Controllers
    ↓
Database Models
    ↓
MongoDB
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
* Rotate secrets regularly
* Restrict CORS origins
* Store credentials securely

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
* MongoDB Database
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

If a separate license file exists, please refer to that file for the official licensing terms.
