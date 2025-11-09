import { configureStore } from "@reduxjs/toolkit";
import  userDetailFunction  from "./userDetailSlice.js";
import blogCategoryDetail  from "./allBlogCategorySlice.js";

const userReducer = {
  userSlice: userDetailFunction,
  blogCategorySliceName: blogCategoryDetail
};

export const store = configureStore({
  reducer: userReducer,
});
