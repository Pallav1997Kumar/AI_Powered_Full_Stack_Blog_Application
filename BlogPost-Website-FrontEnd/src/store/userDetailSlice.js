import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userDetail: null
};


export const userDetailSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {
        userDetailFunction: function(state){
            return state.userDetail;
        },
        login: function(state, action){
            state.userDetail = action.payload;
        },
        logout: function(state){
            state.userDetail = null;
        },
        update: function(state, action){
            state.userDetail = action.payload;
        },
    }
});

export const { userDetailFunction, login, logout, update } = userDetailSlice.actions;
export default userDetailSlice.reducer;