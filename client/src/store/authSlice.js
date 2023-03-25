import { configureStore, createSlice } from '@reduxjs/toolkit';


const initialState = {
    isLoggedIn : false,
    userInfo: JSON.parse(localStorage.getItem("user")) ?? {}
}

const authSlice = createSlice ({
    name: "auth",
    initialState,
    reducers: {
        login(state) {
            state.isLoggedIn = true;
        },
        logout(state) {
            state.isLoggedIn = false;
        }
    }
});

export const authAction = authSlice.actions;


export const store = configureStore({
    reducer: authSlice.reducer
});