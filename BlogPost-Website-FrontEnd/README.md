# AI-Powered Blog Application - Frontend

A modern React.js frontend for an AI-powered blogging platform that allows users to discover, create, manage, and interact with blog content. The application includes authentication, blog publishing, search, category filtering, comments, likes, profile management, and AI-generated blog summaries.

---

# Table of Contents

* Overview
* Features
* Tech Stack
* Project Structure
* Application Routes
* State Management
* Installation
* Environment Variables
* Running the Application
* Available Scripts
* Frontend Architecture
* Key Components
* Styling
* Error Handling
* Deployment
* Contributing
* License

---

# Overview

This project is the frontend application for an AI-powered blogging platform built using React.js.

The application enables users to:

* Create and publish blog posts
* Edit existing blog posts
* Search blog content
* Browse blogs by category
* View blogs from specific authors
* Like and comment on posts
* Manage personal profiles
* View AI-generated blog summaries

The frontend communicates with backend APIs through configurable environment variables, allowing it to work with either the MongoDB or MySQL backend implementation.

---

# Features

## Authentication

Users can:

* Register new accounts
* Log into existing accounts
* Log out securely
* Handle deleted account scenarios

### Components

```text
components/authorization/
├── Login.js
├── Register.js
├── Logout.js
├── DeletedAccount.js
└── LoginRegisterSideComponent.js
```

---

## Blog Discovery

Users can:

* Browse all blogs
* Browse blogs by category
* Browse blogs by author
* Filter blog posts
* Sort blog posts

### Components

```text
components/all blogs/
├── AllBlogs.js
├── AllBlogsPostContainer.js
├── ApplyFilterAndSort.js
├── NoPostForFilter.js
├── NoPostFromUser.js
└── NoPostSpecificCategory.js
```

---

## Blog Homepage

The application includes a dedicated blog homepage experience.

### Components

```text
components/blog home/
├── AllBlogsHomePageComponent.js
├── BlogPostCard.js
├── CategoryCard.js
└── EachCategoryBlogPost.js
```

---

## Blog Search

Users can search blog content.

### Components

```text
components/blog search/
└── BlogSearch.js
```

---

## Blog Creation & Editing

Authenticated users can:

* Create blog posts
* Update existing blog posts

### Components

```text
components/write post/
└── WriteBlogPost.js

components/update post/
└── UpdatePost.js
```

---

## Blog Reading Experience

Users can:

* Read blog posts
* View comments
* Like posts
* View users who liked a post
* Read AI-generated summaries

### Components

```text
components/single post/
├── AISummary.js
├── CommentSection.js
├── LikedBy.js
├── SingleBlogPost.js
├── SingleComment.js
└── SingleOnlyPostSection.js
```

---

## Profile Management

Users can edit profile information.

### Components

```text
components/edit profile/
└── EditProfile.js
```

---

## Educational Content

The platform includes educational pages about blogging.

### Components

```text
components/static component/
├── Home.js
├── ContactUs.js
├── WhatIsBlog.js
└── WhatIsBlog Lazy Component/
```

---

## Responsive Navigation

The application includes separate navigation systems for desktop and mobile devices.

### Components

```text
components/fixed component/
├── NavBar.js
├── NavbarDesktop.js
├── NavbarMobile.js
└── Footer.js
```

---

# Tech Stack

| Category           | Technology                   |
| ------------------ | ---------------------------- |
| Frontend Framework | React.js                     |
| State Management   | Redux                        |
| State Persistence  | Redux Persist                |
| Routing            | React Router                 |
| Styling            | SCSS / Sass                  |
| Build Tooling      | React Scripts                |
| Testing            | Jest + React Testing Library |
| API Communication  | REST APIs                    |

---

# Project Structure

```text
src/
├── components/
├── pages/
├── store/
├── style/
├── utils/
├── images/
├── videos/
├── App.js
├── index.js
└── backendBaseURL.js
```

---

## Directory Overview

### components/

Contains reusable UI components.

### pages/

Contains route-level pages.

### store/

Contains Redux state management logic.

### style/

Contains SCSS stylesheets.

### utils/

Contains helper and utility functions.

### images/

Contains static image assets.

### videos/

Contains educational video content.

---

# Application Routes

The application uses React Router for client-side routing.

| Route                              | Description               |
| ---------------------------------- | ------------------------- |
| `/`                                | Home Page                 |
| `/contact`                         | Contact Us Page           |
| `/register`                        | User Registration         |
| `/login`                           | User Login                |
| `/logout`                          | User Logout               |
| `/accountDeleted`                  | Deleted Account Page      |
| `/blogs`                           | Browse All Blogs          |
| `/blogsHome`                       | Blog Homepage             |
| `/blogs/postId/:postID`            | Single Blog Post          |
| `/blogs/updatePost/postId/:postID` | Update Existing Blog Post |
| `/blogs/category/:categoryName`    | Blogs By Category         |
| `/blogs/username/:username`        | Blogs By Author           |
| `/write`                           | Create New Blog Post      |
| `/blogSearch`                      | Blog Search               |
| `/edit_profile/:username`          | Edit User Profile         |
| `/what_is_blog`                    | Learn About Blogging      |

---

# State Management

Redux is used for global application state management.

## Store Structure

```text
store/
├── store.js
├── userDetailSlice.js
├── allBlogCategorySlice.js
└── reduxpersistStore.js
```

---

## Responsibilities

### userDetailSlice

Stores:

* User information
* Authentication data
* Session state

### allBlogCategorySlice

Stores:

* Blog categories
* Category-related state

### Redux Persist

Persists selected Redux state across browser refreshes.

---

# Installation

## Clone Repository

```bash
git clone <repository-url>
```

Navigate to frontend:

```bash
cd BlogPost-Website-FrontEnd
```

Install dependencies:

```bash
npm install
```

---

# Environment Variables

Create a `.env` file inside the frontend directory.

```env
REACT_APP_ENVIRONMENT=

REACT_APP_BACKEND_LOCAL_BASEURL=

REACT_APP_BACKEND_PRODUCTION_BASEURL=
```

---

## Variable Description

| Variable                             | Description                     |
| ------------------------------------ | ------------------------------- |
| REACT_APP_ENVIRONMENT                | Current application environment |
| REACT_APP_BACKEND_LOCAL_BASEURL      | Local backend URL               |
| REACT_APP_BACKEND_PRODUCTION_BASEURL | Production backend URL          |

---

# Running the Application

Start development server:

```bash
npm start
```

Application URL:

```text
http://localhost:3000
```

---

# Available Scripts

### Start Development Server

```bash
npm start
```

### Run Tests

```bash
npm test
```

### Create Production Build

```bash
npm run build
```

---

# Frontend Architecture

The frontend follows a component-driven architecture.

```text
Pages
  ↓
Components
  ↓
Redux Store
  ↓
API Layer
  ↓
Backend Services
```

---

## High-Level Flow

```text
User Action
      ↓
Page Component
      ↓
Reusable Component
      ↓
Redux State
      ↓
Backend API
      ↓
Response
      ↓
UI Update
```

---

# Key Components

## Authentication

```text
Login.js
Register.js
Logout.js
DeletedAccount.js
```

Responsible for user access management.

---

## Blog Management

```text
WriteBlogPost.js
UpdatePost.js
AllBlogs.js
SingleBlogPost.js
```

Responsible for content creation and viewing.

---

## AI Summary

```text
AISummary.js
```

Displays AI-generated summaries returned by the backend.

---

## Search

```text
BlogSearch.js
```

Handles blog discovery through search functionality.

---

## Comments

```text
CommentSection.js
SingleComment.js
```

Handles comment rendering and interactions.

---

## Likes

```text
LikedBy.js
```

Displays like-related information.

---

# Styling

The application uses SCSS for styling.

```text
style/
├── authorization/
├── blog home/
├── blog search/
├── single post/
├── write post/
├── update post/
├── edit profile/
├── fixed component/
├── static component/
└── common files/
```

Common SCSS utilities:

```text
_variables.scss
_mixinFiles.scss
_update-write-common.scss
```

---

# Error Handling

The frontend includes a dedicated React Error Boundary.

```text
components/error boundary/
└── ErrorBoundary.js
```

This helps prevent the entire application from crashing due to unexpected component errors.

---

# Deployment

The frontend can be deployed to any static hosting provider that supports React applications.

Examples include:

* Netlify
* Vercel
* GitHub Pages
* Firebase Hosting

The environment configuration indicates deployment support for:

```text
https://ai-powered-blog-application.netlify.app
```

---

# Contributing

Contributions are welcome.

## Development Workflow

Create a feature branch:

```bash
git checkout -b feature/new-feature
```

Commit changes:

```bash
git commit -m "Add new feature"
```

Push changes:

```bash
git push origin feature/new-feature
```

Create a Pull Request for review.

---

# License

This project is licensed under the MIT License.

If a separate license file exists in the repository, refer to that file for the official licensing terms.
