import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ScrollToTop from "./ScrollToTop.js";
import NavBar from "./components/fixed component/NavBar.js";
import Footer from "./components/fixed component/Footer.js";

import ContactUsPage from './pages/ContactUsPage.js';
import HomePage from './pages/HomePage.js';
import LoginPage from './pages/LoginPage.js';
import RegisterPage from './pages/RegisterPage.js';
import DeletedAccountPage from './pages/DeletedAccountPage.js';
import AllBlogsPage from './pages/AllBlogsPage.js';
import LogoutPage from './pages/LogoutPage.js';
import UpdateBlogPostPage from './pages/UpdateBlogPostPage.js';
import SingleBlogPostPage from './pages/SingleBlogPostPage.js';
import WriteBlogPostPage from './pages/WriteBlogPostPage.js';
import EditProfilePage from './pages/EditProfilePage.js';
import AllBlogsHomePage from './pages/AllBlogsHomePage.js';
import WhatIsBlogPage from './pages/WhatIsBlogPage.js';
import BlogSearchPage from './pages/BlogSearchPage.js';


/*const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/contact",
    element: <ContactUs />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/blogs",
    element: <AllBlogs />,
  }
]);*/

function App() {
  return (
    <div>
       <BrowserRouter>
          <ScrollToTop />
          <NavBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/contact" element={<ContactUsPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/logout" element={<LogoutPage />} />
            <Route path="/accountDeleted" element={<DeletedAccountPage />} />
            <Route path="/blogs" element={<AllBlogsPage />} />
            <Route path="/blogsHome" element={<AllBlogsHomePage />} />
            <Route path="/blogs/updatePost/postId/:postID" element={<UpdateBlogPostPage />} />
            <Route path="/blogs/postId/:postID" element={<SingleBlogPostPage />} />
            <Route path="/blogs/category/:categoryName" element={<AllBlogsPage />} />
            <Route path="/blogs/username/:username" element={<AllBlogsPage />} />
            <Route path="/write" element={<WriteBlogPostPage />} />
            <Route path="/blogSearch" element={<BlogSearchPage />} />
            <Route path="/edit_profile/:username" element={<EditProfilePage />} />
            <Route path ="/what_is_blog" element={<WhatIsBlogPage />} />
          </Routes>
          <Footer />
       </BrowserRouter>
    </div>
  );
}

export default App;
