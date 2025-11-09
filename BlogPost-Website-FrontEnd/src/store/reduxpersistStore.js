import { configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import  userDetailFunction  from "./userDetailSlice.js";
import blogCategoryDetail  from "./allBlogCategorySlice.js";


const persistConfig = {
  key: 'root',
  storage,
};
const userReducer = combineReducers({
  userSlice: userDetailFunction,
  blogCategorySliceName: blogCategoryDetail
});

const persistedReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk]
});

export const persistor = persistStore(store);
