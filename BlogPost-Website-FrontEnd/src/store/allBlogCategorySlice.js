import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import backendBaseURL from "../backendBaseURL.js";

const initialState = {
    blogCategories: [],
    loading: false,
    error: null
  }

export const getAllBlogCategory = createAsyncThunk("blogCategorySliceName", async function(args,{rejectWithValue}){
    try {
        const response = await axios.get(`${backendBaseURL}/api/blog/categoryList`);
        return response.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const allBlogCategorySlice = createSlice({
    name: "blogCategorySliceName",
    initialState,
    reducers: {},
    extraReducers: {
        [getAllBlogCategory.pending]: function(state){
            state.loading = true;
        },
        [getAllBlogCategory.rejected]: function(state, action){
            state.loading = false;
            state.error = action.payload;
        },
        [getAllBlogCategory.fulfilled]: function(state, action){
            state.loading = false;
            state.blogCategories = action.payload;
        }
    }
});

export default allBlogCategorySlice.reducer;