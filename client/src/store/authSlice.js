import { configureStore, createSlice } from '@reduxjs/toolkit';


const token = localStorage.getItem("blog-token") ? JSON.parse(localStorage.getItem("blog-token")): null;

const initialState = {
    isLoggedIn : token ? true: false,
    user: null, 
    token: token
}

const authSlice = createSlice ({
    name: "auth",
    initialState,
    reducers: {
        login(state, action) {
            state.isLoggedIn = true;
            const {user, token} = action.payload;
            state.user = user;
            state.token = token;
        },
        logout(state) {
            state.isLoggedIn = false;
            state.user = null ;
            state.token = null;
        }
    }
});

export const authAction = authSlice.actions;
export default authSlice.reducer
export const selectCurrentUser = (state) =>{
    return  state.auth.user
};
export const selectCurrentToken = (state) => state.auth.token;
