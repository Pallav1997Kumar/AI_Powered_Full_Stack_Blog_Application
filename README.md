# AI-Powered Full Stack Blog Application

A full-stack blogging platform built using **React.js** and **Node.js** that enables users to create, publish, discover, and interact with blog content. The project includes authentication, profile management, blog categorization, comments, likes, image uploads, search functionality, and AI-powered content processing.

The repository contains:

* React Frontend Application
* Node.js + MongoDB Backend
* Node.js + MySQL Backend
* AI Integration Layer
* Cloudinary-Based Image Management

---

# Table of Contents

* Overview
* Features
* Tech Stack
* Repository Structure
* Frontend Routes
* Installation
* Environment Variables
* Running the Application
* Available Scripts
* Application Architecture
* Frontend Architecture
* Backend Architecture
* Database Design
* API Modules
* AI Integration
* Image Upload Workflow
* State Management
* Error Handling
* Deployment
* Contributing
* License

---

# Overview

This project is an AI-powered blogging platform that allows users to write, publish, edit, search, and interact with blog posts.

Based on the repository structure, the application supports:

* User authentication
* Profile management
* Blog publishing
* Blog editing
* Blog categorization
* Blog searching
* Commenting system
* Like system
* AI-generated blog summaries
* Image uploads
* Responsive user interface

A notable aspect of the repository is the availability of **two backend implementations**:

1. MongoDB Version
2. MySQL Version

This enables developers to choose between NoSQL and SQL database architectures while using the same React frontend.

---

# Features

## Authentication & User Management

* User Registration
* User Login
* User Logout
* JWT-Based Authentication
* Profile Editing
* Account Deletion Workflow
* Persistent User Sessions

### Related Files

```text
authorization/
├── Login.js
├── Register.js
├── Logout.js
└── DeletedAccount.js

authorizationController.js
authorizationRoute.js
blogUserController.js
blogUserRoute.js
```

---

## Blog Management

Users can:

* Create Blog Posts
* Update Existing Blog Posts
* View Individual Posts
* Browse All Posts
* View Posts by Author
* View Posts by Category

### Related Files

```text
WriteBlogPost.js
UpdatePost.js
AllBlogs.js
SingleBlogPost.js

blogPostController.js
blogPostRoute.js
```

---

## Content Discovery

* Browse all blog posts
* Category-based navigation
* Author-specific blog pages
* Search functionality
* Blog homepage feed

### Related Files

```text
BlogSearch.js
CategoryCard.js
EachCategoryBlogPost.js
ApplyFilterAndSort.js

searchUserCategoryBlogController.js
searchUserCategoryBlogRoute.js
```

---

## Community Features

### Comments

* Add comments
* View comments
* Comment discussions

Files:

```text
CommentSection.js
SingleComment.js

blogPostCommentController.js
blogPostCommentRoute.js
```

### Likes

* Like blog posts
* View users who liked a post

Files:

```text
LikedBy.js

blogPostLikeController.js
blogPostLikeRoute.js
```

---

## AI Features

The repository contains dedicated AI modules:

```text
AISummary.js

generativeAIController.js
generativeAIRoute.js
```

Based on the repository structure, the application appears to support:

* AI-generated summaries
* AI-assisted content processing
* Generative AI-powered blog enhancements

---

## Media Management

### Image Uploads

The application includes a dedicated image upload pipeline using:

```text
imageUploadController.js
imageUploadRoute.js

cloudinaryConfig.js
multerConfig.js
```

Likely capabilities include:

* Blog image uploads
* Cloudinary image hosting
* Image processing before storage

---

## User Experience

* Responsive Navigation
* Desktop Navigation
* Mobile Navigation
* Error Boundary Handling
* Lazy Loaded Components
* Educational Content Pages

---

# Tech Stack

| Category          | Technology                                               |
| ----------------- | -------------------------------------------------------- |
| Frontend          | React.js                                                 |
| Backend           | Node.js                                                  |
| API Framework     | Express.js (inferred from route/controller architecture) |
| Database          | MongoDB                                                  |
| Database          | MySQL                                                    |
| Authentication    | JWT                                                      |
| State Management  | Redux                                                    |
| State Persistence | Redux Persist                                            |
| Styling           | SCSS / Sass                                              |
| File Uploads      | Multer                                                   |
| Image Hosting     | Cloudinary                                               |
| AI Services       | Google Generative AI (inferred)                          |
| Configuration     | dotenv                                                   |

---

# Repository Structure

```text
.
├── BlogPost-Website-FrontEnd/
├── Blogpost-with-MongoDB/
├── Blogpost-with-MySQL/
└── .gitignore
```

---

## Frontend Structure

```text
BlogPost-Website-FrontEnd/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── store/
│   ├── style/
│   ├── utils/
│   ├── images/
│   └── videos/
```

### Major Directories

| Directory  | Purpose                |
| ---------- | ---------------------- |
| components | Reusable UI Components |
| pages      | Route-Level Pages      |
| store      | Redux State Management |
| style      | SCSS Stylesheets       |
| utils      | Utility Functions      |
| images     | Static Images          |
| videos     | Educational Videos     |

---

## MongoDB Backend Structure

```text
Blogpost-with-MongoDB/
├── config/
├── controllers/
├── database-models/
├── routes/
├── utils/
└── server.js
```

---

## MySQL Backend Structure

```text
Blogpost-with-MySQL/
├── config/
├── controllers/
├── routes/
├── sqlQueries/
├── utils/
└── index.js
```

---

# Frontend Routes

The application uses React Router for client-side routing.

| Route                              | Description                       |
| ---------------------------------- | --------------------------------- |
| `/`                                | Home Page                         |
| `/contact`                         | Contact Us Page                   |
| `/register`                        | User Registration                 |
| `/login`                           | User Login                        |
| `/logout`                          | User Logout                       |
| `/accountDeleted`                  | Account Deleted Confirmation Page |
| `/blogs`                           | Browse All Blog Posts             |
| `/blogsHome`                       | Blog Homepage                     |
| `/blogs/postId/:postID`            | View Single Blog Post             |
| `/blogs/updatePost/postId/:postID` | Update Existing Blog Post         |
| `/blogs/category/:categoryName`    | View Blogs By Category            |
| `/blogs/username/:username`        | View Blogs By Author              |
| `/write`                           | Create Blog Post                  |
| `/blogSearch`                      | Search Blog Posts                 |
| `/edit_profile/:username`          | Edit User Profile                 |
| `/what_is_blog`                    | Educational Blogging Page         |

---

# Installation

## Clone Repository

```bash
git clone <repository-url>
cd <repository-name>
```

---

## Frontend Setup

```bash
cd BlogPost-Website-FrontEnd

npm install

npm start
```

Application:

```text
http://localhost:3000
```

---

## MongoDB Backend Setup

```bash
cd Blogpost-with-MongoDB

npm install

npm start
```

---

## MySQL Backend Setup

```bash
cd Blogpost-with-MySQL

npm install

npm start
```

---

# Environment Variables

## Frontend

Create a `.env` file inside the frontend directory:

```env
REACT_APP_ENVIRONMENT=
REACT_APP_BACKEND_LOCAL_BASEURL=
REACT_APP_BACKEND_PRODUCTION_BASEURL=
```

---

## Backend

Create a `.env` file inside the backend directory:

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

# Running the Application

### Start Backend

```bash
npm start
```

### Start Frontend

```bash
npm start
```

Visit:

```text
http://localhost:3000
```

---

# Available Scripts

## Frontend

```bash
npm start
npm test
npm run build
```

## Backend

```bash
npm start
```

Refer to the individual `package.json` files for the complete list of available scripts.

---

# Application Architecture

```text
User
 ↓
React Frontend
 ↓
Redux Store
 ↓
REST API
 ↓
Node.js Backend
 ↓
Controllers
 ↓
Database Layer
 ↓
Database
```

---

# Frontend Architecture

```text
Pages
 ↓
Components
 ↓
Redux Store
 ↓
API Calls
 ↓
Backend Services
```

Main frontend modules:

* Authentication
* Blog Feed
* Single Blog View
* Search
* Categories
* Profile Management
* Comments
* Likes
* AI Summary

---

# Backend Architecture

The backend follows a layered architecture:

```text
Routes
 ↓
Controllers
 ↓
Business Logic
 ↓
Database Layer
 ↓
Database
```

This separation improves maintainability and scalability.

---

# Database Design

## MongoDB Models

```text
blogUser
blogPost
blogCategory
blogPostComment
blogPostLike
```

These models represent the core entities of the application.

---

## MySQL Query Modules

```text
authorizationQuery
blogUserQuery
blogPostQuery
blogCategoryListQuery
blogPostCommentQuery
blogPostLikeQuery
multipleTablesJoinQuery
```

These files contain database operations and query logic.

---

# API Modules

The backend exposes functionality through dedicated route modules.

| Route Module                | Purpose              |
| --------------------------- | -------------------- |
| authorizationRoute          | Authentication       |
| blogUserRoute               | User Management      |
| blogPostRoute               | Blog CRUD Operations |
| blogCategoryListRoute       | Categories           |
| blogPostCommentRoute        | Comments             |
| blogPostLikeRoute           | Likes                |
| imageUploadRoute            | Image Upload         |
| generativeAIRoute           | AI Features          |
| searchUserCategoryBlogRoute | Search & Filtering   |

> Exact endpoint URLs should be verified from the route implementation files.

---

# AI Integration

The project contains dedicated AI-related modules:

```text
AISummary.js
generativeAIController.js
generativeAIRoute.js
googleAuthToken.js
```

Based on the repository structure, the AI workflow likely follows:

```text
Blog Content
      ↓
AI Service
      ↓
Generated Summary
      ↓
Frontend Display
```

The Google service account configuration suggests integration with Google's generative AI ecosystem.

---

# Image Upload Workflow

The image upload process appears to be:

```text
User Upload
      ↓
Multer Middleware
      ↓
Cloudinary Storage
      ↓
Image URL
      ↓
Blog Post
```

Files involved:

```text
multerConfig.js
cloudinaryConfig.js
imageUploadController.js
imageUploadRoute.js
```

---

# State Management

Redux is used for global state management.

Store modules:

```text
store.js
userDetailSlice.js
allBlogCategorySlice.js
reduxpersistStore.js
```

Responsibilities include:

* User State
* Authentication State
* Category Data
* Persisted Sessions

---

# Error Handling

The frontend includes a dedicated React Error Boundary:

```text
ErrorBoundary.js
```

This helps prevent application crashes caused by unexpected component-level errors.

---

# Deployment

The frontend configuration references a deployed application:

```text
https://ai-powered-blog-application.netlify.app
```

The backend can be deployed on any Node.js-compatible hosting provider, including:

* Render
* Railway
* AWS EC2
* DigitalOcean
* VPS Servers

Deployment requirements:

* Node.js Runtime
* Environment Variables
* Database Connectivity
* Cloudinary Credentials
* Google AI Credentials

---

# Contributing

Contributions are welcome.

1. Fork the repository

2. Create a feature branch

```bash
git checkout -b feature/new-feature
```

3. Commit your changes

```bash
git commit -m "Add new feature"
```

4. Push to your branch

```bash
git push origin feature/new-feature
```

5. Open a Pull Request

---

# License

This project is licensed under the MIT License.

If a separate license file exists in the repository, please refer to that file for the official licensing terms.
